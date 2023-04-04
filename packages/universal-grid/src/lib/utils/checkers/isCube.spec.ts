import { describe, it, expect } from 'vitest'
import { isCube } from './isCube'
describe('isCube', () => {
  it('check object is a CubeCoordinates', () => {
    expect(isCube({ q: 0, r: 0, s: 0 })).toEqual(true)
    expect(isCube({ q: 0, r: 0 })).toEqual(true)
    expect(isCube({ q: NaN, r: 0, s: 0 })).toEqual(false)
    expect(isCube({ x: 0, y: 0 })).toEqual(false)
    expect(isCube({ col: 0, row: 0 })).toEqual(false)
    expect(isCube([0, 0, 0])).toEqual(false)
  })
})
