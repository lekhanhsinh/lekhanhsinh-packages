import { defaultHexagonSettings } from '..'
import { createOrigin } from '../../utils'
import { createHexagonBoundingBox } from '../createHexagonBoundingBox'
import { type HexagonSettings, type HexagonOptions } from '../types'
import { NodeHexagon } from './NodeHexagon'

export const defineNodeHexagon = (
  options?: HexagonOptions
): typeof NodeHexagon => {
  const settings = { ...defaultHexagonSettings }
  if (options != null) {
    let key: keyof HexagonSettings
    for (key in settings) {
      if (options[key] != null) {
        settings[key] = options[key] as never
      }
    }
  }

  settings.size = createHexagonBoundingBox(settings.size, settings.isPointy)
  settings.origin = createOrigin(settings.origin, settings.size)

  return class extends NodeHexagon {
    static override get settings(): HexagonSettings {
      return settings
    }
  }
}

export const defineHexagon = defineNodeHexagon
