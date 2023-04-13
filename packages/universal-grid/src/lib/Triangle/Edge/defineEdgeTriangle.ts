import { createTriangleBoundingBox, defaultTriangleSettings } from '..'
import { createOrigin } from '../../utils'
import { type TriangleOptions, type TriangleSettings } from '../types'
import { EdgeTriangle } from './EdgeTriangle'

export const defineEdgeTriangle = (
  options?: TriangleOptions
): typeof EdgeTriangle => {
  const settings = { ...defaultTriangleSettings }
  if (options != null) {
    let key: keyof TriangleSettings
    for (key in settings) {
      if (options[key] != null) {
        settings[key] = options[key] as never
      }
    }
  }

  settings.size = createTriangleBoundingBox(settings.size)
  settings.origin = createOrigin(settings.origin, settings.size)

  return class extends EdgeTriangle {
    static override get settings(): TriangleSettings {
      return settings
    }
  }
}
