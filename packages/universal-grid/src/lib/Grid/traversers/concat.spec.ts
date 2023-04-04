import { describe, it, expect, vi } from 'vitest'
import { concat } from './concat'
import { type PartCoordinates } from '../../types'
import { Square, type NodeSquare } from '../../Square'

const cursor = new Square([2, 3, 0])
const create = (coordinates?: PartCoordinates<NodeSquare>): NodeSquare =>
  new Square(coordinates)
describe('concat', () => {
  it('return a traverser from multiple traversers', () => {
    const traverser = vi.fn((create, cursor) => [create(cursor)])
    const test = expect.objectContaining({ q: 2, r: 3, s: 0 })
    expect(
      concat<NodeSquare>(traverser, traverser, traverser)(create, cursor)
    ).toEqual(expect.arrayContaining([test, test, test]))
  })
})
