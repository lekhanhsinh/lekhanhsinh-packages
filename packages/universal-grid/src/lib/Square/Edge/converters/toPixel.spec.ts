import { describe, it, expect } from 'vitest'
import { toPixel } from './toPixel'
import { DIRECTION } from '../../../constants'
describe('toPixel', () => {
  it('return PointCoordinates of the center', () => {
    expect(
      toPixel(
        { q: -1, r: -1, s: 0, direction: DIRECTION.N },
        {
          size: { width: 50, height: 50 },
          origin: { x: 0, y: 0 },
          inverse: { x: false, y: false },
        }
      )
    ).toEqual({ x: -25, y: -50 })
  })

  it('{ q: 1, r: 1, s: 0 } equal { x: 100, y: 100 }', () => {
    expect(
      toPixel(
        { q: 1, r: 1, s: 0, direction: DIRECTION.W },
        {
          size: { width: 50, height: 50 },
          origin: { x: 0, y: 0 },
          inverse: { x: false, y: false },
        }
      )
    ).toEqual({ x: 50, y: 75 })
  })

  it('{ q: 2, r: -2, s: 0 } equal { x: 100, y: 100 } inverse:{ x: false, y: true }', () => {
    expect(
      toPixel(
        { q: 2, r: -2, s: 0, direction: DIRECTION.W },
        {
          size: { width: 50, height: 50 },
          origin: { x: 0, y: 0 },
          inverse: { x: false, y: true },
        }
      )
    ).toEqual({ x: 100, y: 125 })
  })
})
