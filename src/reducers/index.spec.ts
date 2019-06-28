import { reducer, actions } from './index'
import { Action } from 'redux'

describe('reducers', () => {
  describe('counter', () => {
    it('should provide the initial state', () => {
      expect(reducer(undefined, {} as Action)).toBe(0)
    })

    it('should handle INCREMENT action', () => {
      expect(reducer(1, actions.increment())).toBe(2)
    })

    it('should handle DECREMENT action', () => {
      expect(reducer(1, actions.decrement())).toBe(0)
    })

    it('should ignore unknown actions', () => {
      expect(reducer(1, { type: 'unknown' })).toBe(1)
    })
  })
})
