import { createHexagonBoundingBox, defaultHexagonSettings } from '..'
import { createOrigin } from '../../utils'
import { type HexagonOptions, type HexagonSettings } from '../types'
import { EdgeHexagon } from './EdgeHexagon'

export const defineEdgeHexagon = (
  options?: HexagonOptions
): typeof EdgeHexagon => {
  let { size, origin, inverse, isPointy, offset } = {
    ...defaultHexagonSettings,
    ...options,
  }

  size = createHexagonBoundingBox(size, isPointy)
  origin = createOrigin(origin, size)

  const settings = { inverse, size, origin, isPointy, offset }

  return class extends EdgeHexagon {
    static override get settings(): HexagonSettings {
      return settings
    }
  }
}
