import { describe, it, expect, vi } from 'vitest'
import { rectangleFilled } from './rectangleFilled'
import { type PartCoordinates } from '../../../types'
import { NodeSquare } from '../Square'
import { DIRECTION } from '../../../constants'

const cursor = new NodeSquare([1, 2, 0])
const create = vi.fn(
  (coordinates?: PartCoordinates<NodeSquare>) => new NodeSquare(coordinates)
)
const test = (coordinates: PartCoordinates<NodeSquare>): unknown =>
  expect.objectContaining(coordinates)

describe('rectangleFilled', () => {
  it('return traveser from start and direction and size ', () => {
    const traverser = rectangleFilled({
      start: [0, 0, 0],
      direction: DIRECTION.N,
      size: { width: 3, height: 2 },
    })
    expect(typeof traverser).toBe('function')
    expect(traverser(create, cursor)).toEqual(
      expect.arrayContaining([
        test({ q: 0, r: 0, s: 0 }),
        test({ q: 0, r: 1, s: 0 }),
        test({ q: 0, r: 2, s: 0 }),
        test({ q: -1, r: 0, s: 0 }),
        test({ q: -1, r: 1, s: 0 }),
        test({ q: -1, r: 2, s: 0 }),
      ])
    )
  })

  it('return traveser from center and radius number ', () => {
    const traverser = rectangleFilled({ center: [0, 0, 0], radius: 2 })
    expect(typeof traverser).toBe('function')
    expect(traverser(create, cursor)).toEqual(
      expect.arrayContaining([
        test({ q: -1, r: -1, s: 0 }),
        test({ q: 0, r: -1, s: 0 }),
        test({ q: 1, r: -1, s: 0 }),
        test({ q: -1, r: 0, s: 0 }),
        test({ q: 0, r: 0, s: 0 }),
        test({ q: 1, r: 0, s: 0 }),
        test({ q: -1, r: 1, s: 0 }),
        test({ q: 0, r: 1, s: 0 }),
        test({ q: 1, r: 1, s: 0 }),
      ])
    )
  })

  it('return traveser from radius Ellipse and sprial', () => {
    const traverser = rectangleFilled({
      radius: { xRadius: 1.5, yRadius: 2 },
      spiral: true,
    })
    expect(typeof traverser).toBe('function')
    expect(traverser(create, cursor)).toEqual(
      expect.arrayContaining([
        test({ q: 2, r: 2, s: 0 }),
        test({ q: 2, r: 3, s: 0 }),
        test({ q: 2, r: 4, s: 0 }),
        test({ q: 1, r: 4, s: 0 }),
        test({ q: 0, r: 4, s: 0 }),
        test({ q: 0, r: 3, s: 0 }),
        test({ q: 0, r: 2, s: 0 }),
        test({ q: 0, r: 1, s: 0 }),
        test({ q: 1, r: 1, s: 0 }),
        test({ q: 2, r: 1, s: 0 }),
        test({ q: 3, r: 1, s: 0 }),
        test({ q: 3, r: 2, s: 0 }),
        test({ q: 3, r: 3, s: 0 }),
        test({ q: 3, r: 4, s: 0 }),
      ])
    )
  })
})
