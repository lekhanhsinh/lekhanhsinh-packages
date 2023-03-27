import { describe, it, expect } from 'vitest'
import { isTuple } from './isTuple'
describe('isTuple', () => {
  it('[0, 0, 0] === true', () => {
    expect(isTuple([0, 0, 0])).toEqual(true)
  })
  it('[0, 0] === true', () => {
    expect(isTuple([0, 0])).toEqual(true)
  })
  it('[NaN, 0, 0] === false', () => {
    expect(isTuple([NaN, 0, 0])).toEqual(false)
  })
  it('{ q: 0, r: 0, s: 0 } === false', () => {
    expect(isTuple({ q: 0, r: 0, s: 0 })).toEqual(false)
  })
  it('{ x: 0, y: 0 } === false', () => {
    expect(isTuple({ x: 0, y: 0 })).toEqual(false)
  })
  it('{ col: 0, row: 0 } === false', () => {
    expect(isTuple({ col: 0, row: 0 })).toEqual(false)
  })
})
