import { defaultSquareSettings } from '..'
import { createOrigin } from '../../utils'
import { createSquareBoundingBox } from '../createSquareBoundingBox'
import { type SquareOptions, type SquareSettings } from '../types'
import { VertexSquare } from './VertexSquare'

export const defineVertexSquare = (
  options?: SquareOptions
): typeof VertexSquare => {
  let { size, origin, inverse } = { ...defaultSquareSettings, ...options }

  size = createSquareBoundingBox(size)
  origin = createOrigin(origin, size)

  const settings = { inverse, size, origin }

  return class extends VertexSquare {
    static override get settings(): SquareSettings {
      return settings
    }
  }
}
