import { describe, it, expect } from 'vitest'
import { isOffset } from './isOffset'
describe('isOffset', () => {
  it('{ col: 0, row: 0 } === true', () => {
    expect(isOffset({ col: 0, row: 0 })).toEqual(true)
  })
  it('{ col: 0 } === false', () => {
    expect(isOffset({ col: 0 })).toEqual(false)
  })
  it('{ col: NaN, row: 0 } === false', () => {
    expect(isOffset({ col: NaN, row: 0 })).toEqual(false)
  })
  it('{ q: 0, r: 0, s: 0 } === false', () => {
    expect(isOffset({ q: 0, r: 0, s: 0 })).toEqual(false)
  })
  it('{ x: 0, y: 0 } === false', () => {
    expect(isOffset({ x: 0, y: 0 })).toEqual(false)
  })
  it('[0, 0, 0] === false', () => {
    expect(isOffset([0, 0, 0])).toEqual(false)
  })
})
