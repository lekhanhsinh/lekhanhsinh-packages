import { createSquareDimensions, defaultSquareSettings } from '../../Node'
import { type SquareSettings } from '../../Node/types'
import { EdgeSquare } from './Square'

export const defineEdgeSquare = (
  squareOptions?: Partial<SquareSettings>
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
