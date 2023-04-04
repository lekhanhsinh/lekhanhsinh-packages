import { describe, it, expect } from 'vitest'
import { toPixel } from './toPixel'
describe('toPixel', () => {
  it('return PointCoordinates of the center', () => {
    expect(
      toPixel(
        { q: 0, r: 0, s: 0 },
        {
          size: { width: 50, height: 50 },
          anchor: { x: 0, y: 0 },
          inverse: { x: false, y: false },
        }
      )
    ).toEqual({ x: 0, y: 0 })

    expect(
      toPixel(
        { q: 2, r: 2, s: 0 },
        {
          size: { width: 50, height: 50 },
          anchor: { x: 0, y: 0 },
          inverse: { x: false, y: false },
        }
      )
    ).toEqual({ x: 100, y: 100 })

    expect(
      toPixel(
        { q: 2, r: -2, s: 0 },
        {
          size: { width: 50, height: 50 },
          anchor: { x: 0, y: 0 },
          inverse: { x: false, y: true },
        }
      )
    ).toEqual({ x: 100, y: 100 })
  })
})
