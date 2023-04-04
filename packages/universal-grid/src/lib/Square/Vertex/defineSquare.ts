import { defaultSquareSettings } from '..'
import { createSquareBoundingBox } from '../createSquareBoundingBox'
import { type SquareOptions, type SquareSettings } from '../types'
import { VertexSquare } from './VertexSquare'

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
