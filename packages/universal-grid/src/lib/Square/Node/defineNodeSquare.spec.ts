import { describe, it, expect } from 'vitest'
import { defineSquare } from './defineNodeSquare'
import { type SquareOptions } from '../types'
import { defaultSquareSettings } from '..'

describe('defineSquare', () => {
  it('return a class extends from base class', () => {
    const Square = defineSquare()
    expect(Square).toBeTypeOf('function')
    expect(new Square()).toBeInstanceOf(Square)
    expect(Square.settings).toEqual(defaultSquareSettings)
    expect(Square.settings).not.toBe(defaultSquareSettings)
  })

  it('returns a class has custom settings', () => {
    const settings: SquareOptions = {
      size: { width: 100, height: 100 },
      anchor: { x: 1, y: 1 },
      inverse: { x: false, y: true },
    }
    const Square = defineSquare(settings)
    expect(Square.settings).toEqual(settings)
    expect(Square.settings).not.toEqual(defaultSquareSettings)
  })
})
