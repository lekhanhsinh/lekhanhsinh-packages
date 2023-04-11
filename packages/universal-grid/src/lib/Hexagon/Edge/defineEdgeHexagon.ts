import { createHexagonBoundingBox, defaultHexagonSettings } from '..'
import { createOrigin } from '../../utils'
import { type HexagonOptions, type HexagonSettings } from '../types'
import { EdgeHexagon } from './EdgeHexagon'

export const defineEdgeHexagon = (
  options?: HexagonOptions
): typeof EdgeHexagon => {
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

  return class extends EdgeHexagon {
    static override get settings(): HexagonSettings {
      return settings
    }
  }
}
