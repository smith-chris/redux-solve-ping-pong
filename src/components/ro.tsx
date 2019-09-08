import React, { FunctionComponent } from 'react'
import ReactDOM from 'react-dom'
import { connect, Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { Epic, createEpicMiddleware } from 'redux-observable'
import { mapTo, delay } from 'rxjs/operators'

const PING = 'PING'
const PONG = 'PONG'

type State = {
  isPinging: boolean
}

const initialState: State = { isPinging: false }

interface PingAction {
  type: typeof PING
}

interface PongAction {
  type: typeof PONG
  payload: number
}

type Actions = PingAction | PongAction

const ping = (): PingAction => ({ type: PING })

const pingEpic: Epic = action$ =>
  action$.ofType(PING).pipe(
    delay(1000),
    mapTo({ type: PONG })
  )

const pingReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case PING:
      return { isPinging: true }

    case PONG:
      return { isPinging: false }

    default:
      return state
  }
}

type AppProps = State & { ping: typeof ping }

let App: FunctionComponent<AppProps> = ({ isPinging, ping }) => (
  <div>
    <h1>is pinging: {isPinging.toString()}</h1>
    <button onClick={ping}>Start PING</button>
  </div>
)

const ConnectedApp = connect(
  ({ isPinging }: State) => ({ isPinging }),
  { ping }
)(App)

const epicMiddleware = createEpicMiddleware()

const store = createStore(pingReducer, applyMiddleware(epicMiddleware))

epicMiddleware.run(pingEpic)

store.subscribe(() => {
  console.log(store.getState())
})

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root')
)
