import { describe, it, expect } from 'vitest'
import { isTriangle } from './isTriangle'
describe('isTriangle', () => {
  it('check CubeCoordinates is a valid Triangle', () => {
    expect(isTriangle({ q: 1, r: 0, s: 1 })).toEqual(true)
    expect(isTriangle({ q: 0, r: 1, s: 0 })).toEqual(true)
    expect(isTriangle({ q: 1, r: 1, s: 1 })).toEqual(false)
    expect(isTriangle({ q: 0, r: -1, s: 0 })).toEqual(false)
  })
})
