import { describe, it, expect } from 'vitest'
import { createSquareBoundingBox } from './createSquareBoundingBox'
describe('createSquareBoundingBox', () => {
  it('return BoundingBox when input number', () => {
    expect(createSquareBoundingBox(10)).toEqual({
      width: 10 * Math.SQRT2,
      height: 10 * Math.SQRT2,
    })
  })
  it('return BoundingBox when input BoundingBox', () => {
    expect(createSquareBoundingBox({ width: 10, height: 10 })).toEqual({
      width: 10,
      height: 10,
    })
  })
  it('return BoundingBox when input Ellipse', () => {
    expect(createSquareBoundingBox({ xRadius: 10, yRadius: 10 })).toEqual({
      width: 10 * Math.SQRT2,
      height: 10 * Math.SQRT2,
    })
  })
  it('throw error when input is invalid', () => {
    // @ts-expect-error throw error when input is invalid
    expect(() => createSquareBoundingBox()).toThrowError()
  })
})
