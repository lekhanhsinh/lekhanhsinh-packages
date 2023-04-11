import { createHexagonBoundingBox, defaultHexagonSettings } from '..'
import { createOrigin } from '../../utils'
import { type HexagonOptions, type HexagonSettings } from '../types'
import { VertexHexagon } from './VertexHexagon'

export const defineVertexHexagon = (
  options?: HexagonOptions
): typeof VertexHexagon => {
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

  return class extends VertexHexagon {
    static override get settings(): HexagonSettings {
      return settings
    }
  }
}
