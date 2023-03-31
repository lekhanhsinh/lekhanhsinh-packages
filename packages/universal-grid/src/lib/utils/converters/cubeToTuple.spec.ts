import { describe, it, expect } from 'vitest'
import { cubeToTuple } from './cubeToTuple'
describe('cubeToTuple', () => {
  it('retrun TupleCoordinates from CubeCoordinates', () => {
    expect(cubeToTuple({ q: 0, r: 0, s: 0 })).toEqual([0, 0, 0])
    expect(cubeToTuple({})).toEqual([0, 0, 0])
  })
})
