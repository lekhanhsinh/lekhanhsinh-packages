import { describe, it, expect } from 'vitest'
import { fromPixel } from './fromPixel'
import { DIRECTION } from '../../../constants'
describe('fromPixel', () => {
  it('return CubeCoordinates from a pixel point', () => {
    expect(
      fromPixel(
        { x: 0, y: 0 },
        {
          size: { width: 50, height: 50 },
          origin: { x: 0, y: 0 },
          inverse: { x: false, y: false },
        }
      )
    ).toEqual({ q: 0, r: 0, s: 0, direction: DIRECTION.N })

    expect(
      fromPixel(
        { x: 100, y: 123 },
        {
          size: { width: 50, height: 50 },
          origin: { x: 0, y: 0 },
          inverse: { x: false, y: false },
        }
      )
    ).toEqual({ q: 2, r: 2, s: 0, direction: DIRECTION.N })

    expect(
      fromPixel(
        { x: 1234, y: 1234 },
        {
          size: { width: 50, height: 50 },
          origin: { x: 0, y: 0 },
          inverse: { x: false, y: false },
        }
      )
    ).toEqual({ q: 25, r: 24, s: 0, direction: DIRECTION.N })

    expect(
      fromPixel(
        { x: 100, y: 123 },
        {
          size: { width: 50, height: 50 },
          origin: { x: 0, y: 0 },
          inverse: { x: false, y: true },
        }
      )
    ).toEqual({ q: 2, r: -3, s: 0, direction: DIRECTION.N })

    expect(
      fromPixel(
        { x: 1234, y: 1234 },
        {
          size: { width: 50, height: 50 },
          origin: { x: 0, y: 0 },
          inverse: { x: false, y: true },
        }
      )
    ).toEqual({ q: 25, r: -25, s: 0, direction: DIRECTION.N })
  })
})
