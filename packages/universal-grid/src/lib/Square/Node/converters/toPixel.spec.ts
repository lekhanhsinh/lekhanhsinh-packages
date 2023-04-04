import { describe, it, expect } from 'vitest'
import { toPixel } from './toPixel'
describe('toPixel', () => {
  it('return PointCoordinates of the center', () => {
    expect(
      toPixel(
        { q: -1, r: -1, s: 0 },
        {
          size: { width: 50, height: 50 },
          anchor: { x: 0, y: 0 },
          inverse: { x: false, y: false },
        }
      )
    ).toEqual({ x: -25, y: -25 })

    expect(
      toPixel(
        { q: 1, r: 1, s: 0 },
        {
          size: { width: 50, height: 50 },
          anchor: { x: 0, y: 0 },
          inverse: { x: false, y: false },
        }
      )
    ).toEqual({ x: 75, y: 75 })

    expect(
      toPixel(
        { q: 2, r: -2, s: 0 },
        {
          size: { width: 50, height: 50 },
          anchor: { x: 0, y: 0 },
          inverse: { x: false, y: true },
        }
      )
    ).toEqual({ x: 125, y: 125 })
  })
})
