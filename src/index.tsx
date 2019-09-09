import React, { FunctionComponent } from 'react'
import ReactDOM from 'react-dom'
import { connect, Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { Epic, createEpicMiddleware } from 'redux-observable'
import { mapTo, delay } from 'rxjs/operators'
import { makeReducer, makeActionCreators } from 'redux-solve'

type State = {
  isPinging: boolean
}

const initialState: State = { isPinging: false }

const resolvers = {
  ping: (state: State) => (): State => ({ ...state, isPinging: true }),
  pong: (state: State) => (): State => ({ ...state, isPinging: false }),
}

const actions = makeActionCreators(resolvers, initialState)
const reducer = makeReducer(resolvers, initialState)

const pingEpic: Epic = action$ =>
  action$.ofType(actions.ping().type).pipe(
    delay(1000),
    mapTo(actions.pong())
  )

const epicMiddleware = createEpicMiddleware()

const store = createStore(reducer, applyMiddleware(epicMiddleware))

epicMiddleware.run(pingEpic)

store.subscribe(() => {
  console.log(store.getState())
})

type AppProps = State & typeof actions

let App: FunctionComponent<AppProps> = ({ isPinging, ping }) => (
  <div>
    <h1>is pinging: {isPinging.toString()}</h1>
    <button onClick={ping}>Start PING</button>
  </div>
)

const ConnectedApp = connect(
  ({ isPinging }: State) => ({ isPinging }),
  actions
)(App)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root')
)
