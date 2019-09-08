import React from 'react'
import ReactDOM from 'react-dom'

import { connect, Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { mapTo, delay } from 'rxjs/operators'

const PING = 'PING'
const PONG = 'PONG'

const ping = () => ({ type: PING })

const pingEpic = action$ =>
  action$.ofType(PING).pipe(
    delay(1000),
    mapTo({ type: PONG })
  )

const pingReducer = (state = { isPinging: false }, action) => {
  switch (action.type) {
    case PING:
      return { isPinging: true }

    case PONG:
      return { isPinging: false }

    default:
      return state
  }
}

let App = ({ isPinging, ping }) => (
  <div>
    <h1>is pinging: {isPinging.toString()}</h1>
    <button onClick={ping}>Start PING</button>
  </div>
)

App = connect(
  ({ isPinging }) => ({ isPinging }),
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
    <App />
  </Provider>,
  document.getElementById('root')
)
