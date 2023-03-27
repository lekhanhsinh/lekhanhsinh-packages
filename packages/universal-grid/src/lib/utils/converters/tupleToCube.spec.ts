import { describe, it, expect } from 'vitest'
import { tupleToCube } from './tupleToCube'

describe('tupleToCube', () => {
  it('[0, 0, 0] === { q: 0, r: 0, s: 0 }', () => {
    expect(tupleToCube([0, 0, 0])).toEqual({ q: 0, r: 0, s: 0 })
  })
  it('[] === { q: 0, r: 0, s: 0 }', () => {
    expect(tupleToCube([])).toEqual({ q: 0, r: 0, s: 0 })
  })
})
