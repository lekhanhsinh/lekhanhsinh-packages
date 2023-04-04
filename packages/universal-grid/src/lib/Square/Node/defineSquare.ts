import { type SquareOptions, type SquareSettings } from '../types'
import { createSquareBoundingBox, defaultSquareSettings } from '..'
import { NodeSquare } from './Square'

export const defineNodeSquare = (
  squareOptions?: SquareOptions
): typeof NodeSquare => {
  const { size, anchor, inverse } = {
    ...defaultSquareSettings,
    ...squareOptions,
  }

  const settings = { size: createSquareBoundingBox(size), anchor, inverse }

  return class extends NodeSquare {
    static override get settings(): SquareSettings {
      return settings
    }
  }
}

export const defineSquare = defineNodeSquare
