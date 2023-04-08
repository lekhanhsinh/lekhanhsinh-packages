import { defaultHexagonSettings } from '..'
import { createOrigin } from '../../utils'
import { createHexagonBoundingBox } from '../createHexagonBoundingBox'
import { type HexagonSettings, type HexagonOptions } from '../types'
import { NodeHexagon } from './NodeHexagon'

export const defineNodeHexagon = (
  options?: HexagonOptions
): typeof NodeHexagon => {
  let { size, origin, inverse, isPointy, offset } = {
    ...defaultHexagonSettings,
    ...options,
  }

  size = createHexagonBoundingBox(size, isPointy)
  origin = createOrigin(origin, size)

  const settings = { inverse, size, origin, isPointy, offset }

  return class extends NodeHexagon {
    static override get settings(): HexagonSettings {
      return settings
    }
  }
}

export const defineHexagon = defineNodeHexagon
