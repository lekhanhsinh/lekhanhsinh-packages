import { describe, it, expect } from 'vitest'
import { isOffset } from './isOffset'
describe('isOffset', () => {
  it('check object is a OffsetCoordinates', () => {
    expect(isOffset({ col: 0, row: 0 })).toEqual(true)
    expect(isOffset({ col: 0 })).toEqual(true)
    expect(isOffset({ col: NaN, row: 0 })).toEqual(false)
    expect(isOffset({ q: 0, r: 0, s: 0 })).toEqual(false)
    expect(isOffset({ x: 0, y: 0 })).toEqual(false)
    expect(isOffset([0, 0, 0])).toEqual(false)
  })
})
