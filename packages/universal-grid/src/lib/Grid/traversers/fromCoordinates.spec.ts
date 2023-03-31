import { describe, it, expect } from 'vitest'
import { fromCoordinates } from './fromCoordinates'
import { type PartCoordinates } from '../../types'
import { Square, type NodeSquare } from '../../Node'

const cursor = new Square([2, 3, 0])
const create = (coordinates?: PartCoordinates<NodeSquare>): NodeSquare =>
  new Square(coordinates)
describe('fromCoordinates', () => {
  it('return a traverser from multiple coordinates', () => {
    const test = (coordinates: PartCoordinates<NodeSquare>): unknown =>
      expect.objectContaining(coordinates)
    expect(
      fromCoordinates<NodeSquare>(
        [5, 6, 0],
        [3, 4, 0],
        [7, 8, 0]
      )(create, cursor)
    ).toEqual(
      expect.arrayContaining([
        test({ q: 5, r: 6, s: 0 }),
        test({ q: 3, r: 4, s: 0 }),
        test({ q: 7, r: 8, s: 0 }),
      ])
    )
  })
})
