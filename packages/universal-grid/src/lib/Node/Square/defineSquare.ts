import { type SquareOptions, type SquareSettings } from '../types'
import { defaultSquareSettings, Square } from './Square'
import { createSquareBoundingBox } from './createSquareBoundingBox'

export const defineNodeSquare = (
  squareOptions?: SquareOptions
): typeof Square => {
  const { size, anchor, inverse } = {
    ...defaultSquareSettings,
    ...squareOptions,
  }

  const settings = { size: createSquareBoundingBox(size), anchor, inverse }

  return class extends Square {
    static override get settings(): SquareSettings {
      return settings
    }
  }
}

export const defineSquare = defineNodeSquare
