import { defaultTriangleSettings } from '..'
import { createOrigin } from '../../utils'
import { createTriangleBoundingBox } from '../createTriangleBoundingBox'
import { type TriangleOptions, type TriangleSettings } from '../types'
import { VertexTriangle } from './VertexTriangle'

export const defineVertexTriangle = (
  options?: TriangleOptions
): typeof VertexTriangle => {
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

  return class extends VertexTriangle {
    static override get settings(): TriangleSettings {
      return settings
    }
  }
}
