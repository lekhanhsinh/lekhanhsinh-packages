import { createSquareBoundingBox, defaultSquareSettings } from '../../Node'
import { type SquareOptions, type SquareSettings } from '../../Node/types'
import { VertexSquare } from './Square'

export const defineVertexSquare = (
  squareOptions?: SquareOptions
): typeof VertexSquare => {
  const { size, anchor, inverse } = {
    ...defaultSquareSettings,
    ...squareOptions,
  }

  const settings = { size: createSquareBoundingBox(size), anchor, inverse }

  return class extends VertexSquare {
    static override get settings(): SquareSettings {
      return settings
    }
  }
}
