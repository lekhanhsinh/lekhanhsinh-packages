import { createSquareBoundingBox, defaultSquareSettings } from '..'
import { createOrigin } from '../../utils'
import { type SquareOptions, type SquareSettings } from '../types'
import { EdgeSquare } from './EdgeSquare'

export const defineEdgeSquare = (
  options?: SquareOptions
): typeof EdgeSquare => {
  let { size, origin, inverse } = { ...defaultSquareSettings, ...options }

  size = createSquareBoundingBox(size)
  origin = createOrigin(origin, size)

  const settings = { inverse, size, origin }

  return class extends EdgeSquare {
    static override get settings(): SquareSettings {
      return settings
    }
  }
}
