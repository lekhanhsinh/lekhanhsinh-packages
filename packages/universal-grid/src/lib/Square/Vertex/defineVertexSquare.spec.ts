import { describe, it, expect } from 'vitest'
import { defineVertexSquare } from './defineVertexSquare'
import { defaultSquareSettings } from '..'
import { type SquareOptions } from '../types'

describe('defineVertexSquare', () => {
  it('return a class extends from base class', () => {
    const VertexSquare = defineVertexSquare()
    expect(VertexSquare).toBeTypeOf('function')
    expect(new VertexSquare()).toBeInstanceOf(VertexSquare)
    expect(VertexSquare.settings).toEqual(defaultSquareSettings)
    expect(VertexSquare.settings).not.toBe(defaultSquareSettings)
  })

  it('returns a class has custom settings', () => {
    const settings: SquareOptions = {
      size: { width: 100, height: 100 },
      origin: { x: 1, y: 1 },
      inverse: { x: false, y: true },
    }
    const VertexSquare = defineVertexSquare(settings)
    expect(VertexSquare.settings).toEqual(settings)
    expect(VertexSquare.settings).not.toEqual(defaultSquareSettings)
  })
})
