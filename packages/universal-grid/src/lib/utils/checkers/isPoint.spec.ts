import { describe, it, expect } from 'vitest'
import { isPoint } from './isPoint'
describe('isPoint', () => {
  it('{ x: 0, y: 0 } === true', () => {
    expect(isPoint({ x: 0, y: 0 })).toEqual(true)
  })
  it('{ x: 0 } === false', () => {
    expect(isPoint({ x: 0 })).toEqual(false)
  })
  it('{ x: NaN, y: 0 } === false', () => {
    expect(isPoint({ x: NaN, y: 0 })).toEqual(false)
  })
  it('{ col: 0, row: 0 } === false', () => {
    expect(isPoint({ col: 0, row: 0 })).toEqual(false)
  })
  it('{ q: 0, r: 0, s: 0 } === false', () => {
    expect(isPoint({ q: 0, r: 0, s: 0 })).toEqual(false)
  })
  it('[0, 0, 0] === false', () => {
    expect(isPoint([0, 0, 0])).toEqual(false)
  })
})
