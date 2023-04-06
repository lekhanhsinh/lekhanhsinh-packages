import { describe, it, expect } from 'vitest'
import { isTuple } from './isTuple'
describe('isTuple', () => {
  it('check object is a TupleCoordinates', () => {
    expect(isTuple([0, 0, 0])).toEqual(true)
    expect(isTuple([0, 0])).toEqual(true)
    expect(isTuple([0, 0, undefined, 0])).toEqual(true)
    expect(isTuple([0, 0, undefined, NaN])).toEqual(false)
    expect(isTuple([NaN, 0, 0])).toEqual(false)
    expect(isTuple({ q: 0, r: 0, s: 0 })).toEqual(false)
    expect(isTuple({ x: 0, y: 0 })).toEqual(false)
    expect(isTuple({ col: 0, row: 0 })).toEqual(false)
  })
})
