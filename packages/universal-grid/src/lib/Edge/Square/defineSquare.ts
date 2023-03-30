import { createSquareDimensions, defaultSquareSettings } from '../../Node'
import { SquareOptions, type SquareSettings } from '../../Node/types'
import { EdgeSquare } from './Square'

export const defineEdgeSquare = (
  squareOptions?: SquareOptions
): typeof EdgeSquare => {
  const { size, anchor, inverse } = {
    ...defaultSquareSettings,
    ...squareOptions,
  }

  const settings = { size: createSquareDimensions(size), anchor, inverse }

  return class extends EdgeSquare {
    static override get settings(): SquareSettings {
      return settings
    }
  }
}
