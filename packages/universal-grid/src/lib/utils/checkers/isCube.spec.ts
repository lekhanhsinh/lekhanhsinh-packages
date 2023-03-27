import { describe, it, expect } from 'vitest'
import { isCube } from './isCube'
describe('isCube', () => {
  it('{ q: 0, r: 0, s: 0 } === true', () => {
    expect(isCube({ q: 0, r: 0, s: 0 })).toEqual(true)
  })
  it('{ q: 0, r: 0 } === false', () => {
    expect(isCube({ q: 0, r: 0 })).toEqual(false)
  })
  it('{ q: NaN, r: 0, s: 0 } === false', () => {
    expect(isCube({ q: NaN, r: 0, s: 0 })).toEqual(false)
  })
  it('{ x: 0, y: 0 } === false', () => {
    expect(isCube({ x: 0, y: 0 })).toEqual(false)
  })
  it('{ col: 0, row: 0 } === false', () => {
    expect(isCube({ col: 0, row: 0 })).toEqual(false)
  })
  it('[0, 0, 0] === false', () => {
    expect(isCube([0, 0, 0])).toEqual(false)
  })
})
