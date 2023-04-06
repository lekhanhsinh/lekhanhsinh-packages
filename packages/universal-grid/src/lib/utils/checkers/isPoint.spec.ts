import { describe, it, expect } from 'vitest'
import { isPoint } from './isPoint'
describe('isPoint', () => {
  it('check object is a PointCoordinates', () => {
    expect(isPoint({ x: 0, y: 0 })).toEqual(true)
    expect(isPoint({ x: 0 })).toEqual(true)
    expect(isPoint({ x: 0, direction: 0 })).toEqual(true)
    expect(isPoint({ x: 0, direction: NaN })).toEqual(false)
    expect(isPoint({ x: NaN, y: 0 })).toEqual(false)
    expect(isPoint({ col: 0, row: 0 })).toEqual(false)
    expect(isPoint({ q: 0, r: 0, s: 0 })).toEqual(false)
    expect(isPoint([0, 0, 0])).toEqual(false)
  })
})
