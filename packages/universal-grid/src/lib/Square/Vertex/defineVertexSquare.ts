import { defaultSquareSettings } from '..'
import { createOrigin } from '../../utils'
import { createSquareBoundingBox } from '../createSquareBoundingBox'
import { type SquareOptions, type SquareSettings } from '../types'
import { VertexSquare } from './VertexSquare'

export const defineVertexSquare = (
  options?: SquareOptions
): typeof VertexSquare => {
  const settings = { ...defaultSquareSettings }
  if (options != null) {
    let key: keyof SquareSettings
    for (key in settings) {
      if (options[key] != null) {
        settings[key] = options[key] as never
      }
    }
  }

  settings.size = createSquareBoundingBox(settings.size)
  settings.origin = createOrigin(origin, settings.size)

  return class extends VertexSquare {
    static override get settings(): SquareSettings {
      return settings
    }
  }
}
