import { type SquareOptions, type SquareSettings } from '../types'
import { createSquareBoundingBox, defaultSquareSettings } from '..'
import { NodeSquare } from './NodeSquare'

export const defineNodeSquare = (
  options?: SquareOptions
): typeof NodeSquare => {
  const { size, anchor, inverse } = {
    ...defaultSquareSettings,
    ...options,
  }

  const settings = { size: createSquareBoundingBox(size), anchor, inverse }

  return class extends NodeSquare {
    static override get settings(): SquareSettings {
      return settings
    }
  }
}

export const defineSquare = defineNodeSquare
