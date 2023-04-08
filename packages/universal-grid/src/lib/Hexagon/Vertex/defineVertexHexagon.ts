import { createHexagonBoundingBox, defaultHexagonSettings } from '..'
import { createOrigin } from '../../utils'
import { type HexagonOptions, type HexagonSettings } from '../types'
import { VertexHexagon } from './VertexHexagon'

export const defineVertexHexagon = (
  options?: HexagonOptions
): typeof VertexHexagon => {
  let { size, origin, inverse, isPointy, offset } = {
    ...defaultHexagonSettings,
    ...options,
  }

  size = createHexagonBoundingBox(size, isPointy)
  origin = createOrigin(origin, size)

  const settings = { inverse, size, origin, isPointy, offset }

  return class extends VertexHexagon {
    static override get settings(): HexagonSettings {
      return settings
    }
  }
}
