import { type SquareOptions, type SquareSettings } from '../types'
import { createSquareBoundingBox, defaultSquareSettings } from '..'
import { NodeSquare } from './NodeSquare'
import { createOrigin } from '../../utils'

export const defineNodeSquare = (
  options?: SquareOptions
): typeof NodeSquare => {
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
  settings.origin = createOrigin(settings.origin, settings.size)

  return class extends NodeSquare {
    static override get settings(): SquareSettings {
      return settings
    }
  }
}

export const defineSquare = defineNodeSquare
