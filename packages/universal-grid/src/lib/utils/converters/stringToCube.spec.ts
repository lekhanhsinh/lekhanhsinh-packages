import { describe, it, expect } from 'vitest'
import { stringToCube } from './stringToCube'

describe('stringToCube', () => {
  it('return CubeCoordinates from a string', () => {
    expect(stringToCube('{"q":0,"r":0,"s":0}')).toEqual({ q: 0, r: 0, s: 0 })
  })

  it('handle error when string not return a valid CubeCoordinates', () => {
    expect(() => stringToCube('{"q":0,"r":0}')).toThrowError(
      'String is not valid cube coordinates. Received: {"q":0,"r":0}'
    )
  })
})
