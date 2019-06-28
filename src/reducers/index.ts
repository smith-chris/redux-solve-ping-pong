import { makeReducer, makeActionCreators } from 'redux-solve'

type State = number

const initialState: State = 0

const resolvers = {
  increment: (state: State) => (): State => state + 1,
  decrement: (state: State) => (): State => state - 1,
}

export const actions = makeActionCreators(resolvers, initialState)
export const reducer = makeReducer(resolvers, initialState)
