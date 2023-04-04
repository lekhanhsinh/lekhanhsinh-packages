import { describe, it, expect, vi } from 'vitest'
import { repeatWith } from './repeatWith'
import { type PartCoordinates } from '../../types'
import { Square, type NodeSquare } from '../../Square'

const cursor = new Square([2, 3, 0])
const create = (coordinates?: PartCoordinates<NodeSquare>): NodeSquare =>
  new Square(coordinates)
describe('repeatWith', () => {
  it('return a traverser from multiple traversers', () => {
    const traverser1 = vi.fn((create, cursor) => [
      create([5, 6, 0]),
      create([4, 3, 0]),
    ])
    const traverser2 = vi.fn((create, cursor) => [create(cursor)])
    const test = (coordinates: PartCoordinates<NodeSquare>): unknown =>
      expect.objectContaining(coordinates)
    expect(
      repeatWith<NodeSquare>(traverser1, traverser2)(create, cursor)
    ).toEqual(
      expect.arrayContaining([
        test({ q: 5, r: 6, s: 0 }),
        test({ q: 5, r: 6, s: 0 }),
        test({ q: 4, r: 3, s: 0 }),
        test({ q: 4, r: 3, s: 0 }),
      ])
    )
    expect(
      repeatWith<NodeSquare>(traverser1, traverser2, { includeSource: false })(
        create,
        cursor
      )
    ).toEqual(
      expect.arrayContaining([
        test({ q: 5, r: 6, s: 0 }),
        test({ q: 4, r: 3, s: 0 }),
      ])
    )
  })
})
