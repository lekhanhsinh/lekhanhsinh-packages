import { createSquareDimensions, defaultSquareSettings } from '../../Node'
import { type SquareSettings } from '../../Node/types'
import { VertexSquare } from './Square'

export const defineVertexSquare = (
  squareOptions?: Partial<SquareSettings>
): typeof VertexSquare => {
  const { size, anchor } = { ...defaultSquareSettings, ...squareOptions }

  const settings = { size: createSquareDimensions(size), anchor }

  return class extends VertexSquare {
    static override get settings(): SquareSettings {
      return settings
    }
  }
}
