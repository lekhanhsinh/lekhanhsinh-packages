import { describe, it, expect, vi } from 'vitest'
import { lineWalk } from './lineWalk'
import { type PartCoordinates } from '../../../types'
import { NodeSquare } from '../NodeSquare'
import { DIRECTION } from '../../../constants'

const cursor = new NodeSquare([1, 2, 0])
const create = vi.fn(
  (coordinates?: PartCoordinates<NodeSquare>) => new NodeSquare(coordinates)
)
const test = (coordinates: PartCoordinates<NodeSquare>): unknown =>
  expect.objectContaining(coordinates)

describe('lineWalk', () => {
  it('return traveser from start and stop ', () => {
    const traverser = lineWalk({ start: [0, 0, 0], stop: [2, 2, 0] })
    expect(typeof traverser).toBe('function')
    expect(traverser(create, cursor)).toEqual(
      expect.arrayContaining([
        test({ q: 0, r: 0, s: 0 }),
        test({ q: 1, r: 0, s: 0 }),
        test({ q: 1, r: 1, s: 0 }),
        test({ q: 2, r: 1, s: 0 }),
        test({ q: 2, r: 2, s: 0 }),
      ])
    )
  })
  it('return traveser from direction and length ', () => {
    const traverser = lineWalk({
      direction: DIRECTION.SE,
      length: 5,
    })
    expect(typeof traverser).toBe('function')
    expect(traverser(create, cursor)).toEqual(
      expect.arrayContaining([
        test({ q: 1, r: 1, s: 0 }),
        test({ q: 2, r: 1, s: 0 }),
        test({ q: 2, r: 0, s: 0 }),
        test({ q: 3, r: 0, s: 0 }),
      ])
    )
  })
})
