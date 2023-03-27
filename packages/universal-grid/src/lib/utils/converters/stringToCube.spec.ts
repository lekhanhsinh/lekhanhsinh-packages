import { describe, it, expect } from 'vitest'
import { stringToCube } from './stringToCube'

describe('stringToCube', () => {
  it('"{"q":0,"r":0,"s":0}" === { q: 0, r: 0, s: 0 }', () => {
    expect(stringToCube('{"q":0,"r":0,"s":0}')).toEqual({ q: 0, r: 0, s: 0 })
  })
  it('"{"q":0,"r":0}" throw Error', () => {
    expect(() => stringToCube('{"q":0,"r":0}')).toThrowError(
      'String is not valid cube coordinates. Received: {"q":0,"r":0}'
    )
  })
})
