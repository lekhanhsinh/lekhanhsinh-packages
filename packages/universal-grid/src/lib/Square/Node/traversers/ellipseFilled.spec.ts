import { describe, it, expect, vi } from 'vitest'
import { ellipseFilled } from './ellipseFilled'
import { type PartCoordinates } from '../../../types'
import { NodeSquare } from '../Square'

const cursor = new NodeSquare([1, 2, 0])
const create = vi.fn(
  (coordinates?: PartCoordinates<NodeSquare>) => new NodeSquare(coordinates)
)
const test = (coordinates: PartCoordinates<NodeSquare>): unknown =>
  expect.objectContaining(coordinates)

describe('ellipseFilled', () => {
  it('return traveser from center and radius number ', () => {
    const traverser = ellipseFilled({ center: [0, 0, 0], radius: 2 })
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
  it('return traveser from radius Ellipse ', () => {
    const traverser = ellipseFilled({
      radius: { xRadius: 1, yRadius: 2 },
    })
    expect(typeof traverser).toBe('function')
    expect(traverser(create, cursor)).toEqual(
      expect.arrayContaining([
        test({ q: 1, r: 1, s: 0 }),
        test({ q: 1, r: 3, s: 0 }),
      ])
    )
  })
})
