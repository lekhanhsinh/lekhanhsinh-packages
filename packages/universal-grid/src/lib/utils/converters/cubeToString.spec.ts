import { describe, it, expect } from 'vitest'
import { cubeToString } from './cubeToString'
describe('cubeToString', () => {
  it('return stringify of a CubeCoordinates', () => {
    expect(cubeToString({ q: 0, r: 0, s: 0 })).toEqual('{"q":0,"r":0,"s":0}')
    expect(cubeToString({})).toEqual('{"q":0,"r":0,"s":0}')
    expect(cubeToString({ q: 0, r: 0, s: 0, direction: 0 })).toEqual(
      '{"q":0,"r":0,"s":0,"direction":"E"}'
    )
  })
})
