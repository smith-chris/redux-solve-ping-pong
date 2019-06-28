import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import Counter from './components/Counter'
import { reducer, actions } from './reducers'

const store = createStore(reducer)
const rootEl = document.getElementById('root')

const render = () =>
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => store.dispatch(actions.increment())}
      onDecrement={() => store.dispatch(actions.decrement())}
    />,
    rootEl
  )

render()
store.subscribe(render)
