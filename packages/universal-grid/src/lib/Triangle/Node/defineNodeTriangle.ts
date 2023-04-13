import { type TriangleOptions, type TriangleSettings } from '../types'
import { createTriangleBoundingBox, defaultTriangleSettings } from '..'
import { NodeTriangle } from './NodeTriangle'
import { createOrigin } from '../../utils'

export const defineNodeTriangle = (
  options?: TriangleOptions
): typeof NodeTriangle => {
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

  return class extends NodeTriangle {
    static override get settings(): TriangleSettings {
      return settings
    }
  }
}

export const defineTriangle = defineNodeTriangle
