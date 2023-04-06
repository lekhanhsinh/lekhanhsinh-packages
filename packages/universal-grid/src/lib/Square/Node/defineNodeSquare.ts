import { type SquareOptions, type SquareSettings } from '../types'
import { createSquareBoundingBox, defaultSquareSettings } from '..'
import { NodeSquare } from './NodeSquare'
import { createOrigin } from '../../utils'

export const defineNodeSquare = (
  options?: SquareOptions
): typeof NodeSquare => {
  let { size, origin, inverse } = { ...defaultSquareSettings, ...options }

  size = createSquareBoundingBox(size)
  origin = createOrigin(origin, size)

  const settings = { inverse, size, origin }

  return class extends NodeSquare {
    static override get settings(): SquareSettings {
      return settings
    }
  }
}

export const defineSquare = defineNodeSquare
