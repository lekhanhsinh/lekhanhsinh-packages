import { describe, it, expect } from 'vitest'
import { isTriangle } from './isTriangle'
describe('isTriangle', () => {
  it('{ q: 1, r: 0, s: 1 } === true', () => {
    expect(isTriangle({ q: 1, r: 0, s: 1 })).toEqual(true)
  })
  it('{ q: 0, r: 1, s: 0 } === true', () => {
    expect(isTriangle({ q: 0, r: 1, s: 0 })).toEqual(true)
  })
  it('{ q: 1, r: 1, s: 1 } === false', () => {
    expect(isTriangle({ q: 1, r: 1, s: 1 })).toEqual(false)
  })
  it('{ q: 0, r: -1, s: 0 } === false', () => {
    expect(isTriangle({ q: 0, r: -1, s: 0 })).toEqual(false)
  })
})
