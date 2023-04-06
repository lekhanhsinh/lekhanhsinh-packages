import { describe, it, expect } from 'vitest'
import { defineEdgeSquare } from './defineEdgeSquare'
import { type SquareOptions } from '../types'
import { defaultSquareSettings } from '..'

describe('defineEdgeSquare', () => {
  it('return a class extends from base class', () => {
    const EdgeSquare = defineEdgeSquare()
    expect(EdgeSquare).toBeTypeOf('function')
    expect(new EdgeSquare()).toBeInstanceOf(EdgeSquare)
    expect(EdgeSquare.settings).toEqual(defaultSquareSettings)
    expect(EdgeSquare.settings).not.toBe(defaultSquareSettings)
  })

  it('returns a class has custom settings', () => {
    const settings: SquareOptions = {
      size: { width: 100, height: 100 },
      origin: { x: 1, y: 1 },
      inverse: { x: false, y: true },
    }
    const VertexSquare = defineEdgeSquare(settings)
    expect(VertexSquare.settings).toEqual(settings)
    expect(VertexSquare.settings).not.toEqual(defaultSquareSettings)
  })
})
