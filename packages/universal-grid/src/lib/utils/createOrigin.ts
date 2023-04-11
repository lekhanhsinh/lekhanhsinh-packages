import {
  type PointCoordinates,
  type Ellipse,
  type BoundingBox,
  type AddtionOptions,
} from '../types'
import { isPoint } from '.'

export const createOrigin = (
  input: Required<AddtionOptions['origin']>,
  { width, height }: BoundingBox
): Omit<PointCoordinates, 'direction'> => {
  if (isPoint(input)) return input

  if (typeof input === 'string') {
    switch (input) {
      case 'top-left':
        return { x: width / 2, y: -height / 2 }
      case 'bottom-left':
        return { x: width / 2, y: height / 2 }
      case 'top-right':
        return { x: -width / 2, y: -height / 2 }
      case 'bottom-right':
        return { x: -width / 2, y: height / 2 }
      default:
        break
    }
  }

  if (typeof input === 'object') {
    return {
      x: (input as Ellipse).xRadius * width,
      y: (input as Ellipse).yRadius * height,
    }
  }

  throw new TypeError(
    `Invalid size. Recieved:
        ${JSON.stringify(input)}.`
  )
}
