import { createSquareBoundingBox, defaultSquareSettings } from '..'
import { createOrigin } from '../../utils'
import { type SquareOptions, type SquareSettings } from '../types'
import { EdgeSquare } from './EdgeSquare'

export const defineEdgeSquare = (
  options?: SquareOptions
): typeof EdgeSquare => {
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

  return class extends EdgeSquare {
    static override get settings(): SquareSettings {
      return settings
    }
  }
}
