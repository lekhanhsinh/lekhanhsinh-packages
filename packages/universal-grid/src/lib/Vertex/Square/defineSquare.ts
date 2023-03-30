import { createSquareDimensions, defaultSquareSettings } from '../../Node'
import { SquareOptions, type SquareSettings } from '../../Node/types'
import { VertexSquare } from './Square'

export const defineVertexSquare = (
  squareOptions?: SquareOptions
): typeof VertexSquare => {
  const { size, anchor, inverse } = {
    ...defaultSquareSettings,
    ...squareOptions,
  }

  const settings = { size: createSquareDimensions(size), anchor, inverse }

  return class extends VertexSquare {
    static override get settings(): SquareSettings {
      return settings
    }
  }
}
