import { createSquareBoundingBox, defaultSquareSettings } from '..'
import { type SquareOptions, type SquareSettings } from '../types'
import { EdgeSquare } from './EdgeSquare'

export const defineEdgeSquare = (
  options?: SquareOptions
): typeof EdgeSquare => {
  const { size, anchor, inverse } = {
    ...defaultSquareSettings,
    ...options,
  }

  const settings = { size: createSquareBoundingBox(size), anchor, inverse }

  return class extends EdgeSquare {
    static override get settings(): SquareSettings {
      return settings
    }
  }
}
