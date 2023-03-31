import { createSquareBoundingBox, defaultSquareSettings } from '../../Node'
import { type SquareOptions, type SquareSettings } from '../../Node/types'
import { EdgeSquare } from './Square'

export const defineEdgeSquare = (
  squareOptions?: SquareOptions
): typeof EdgeSquare => {
  const { size, anchor, inverse } = {
    ...defaultSquareSettings,
    ...squareOptions,
  }

  const settings = { size: createSquareBoundingBox(size), anchor, inverse }

  return class extends EdgeSquare {
    static override get settings(): SquareSettings {
      return settings
    }
  }
}
