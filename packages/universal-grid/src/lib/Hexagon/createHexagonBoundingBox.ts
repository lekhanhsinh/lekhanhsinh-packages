import { SQRT3 } from '../constants'
import { type Ellipse, type BoundingBox } from '../types'
import { isFiniteNumber } from '../utils'

export const createHexagonBoundingBox = (
  input: number | BoundingBox | Ellipse,
  isPointy: boolean
): BoundingBox => {
  if (
    typeof input === 'object' &&
    input != null &&
    (input as BoundingBox).width > 0 &&
    (input as BoundingBox).height > 0
  ) {
    return input as BoundingBox
  }

  if (
    typeof input === 'object' &&
    input != null &&
    (input as Ellipse).xRadius > 0 &&
    (input as Ellipse).yRadius > 0
  ) {
    const { xRadius, yRadius } = input as Ellipse
    if (isPointy) {
      return { width: xRadius * SQRT3, height: yRadius * 2 }
    } else {
      return { width: xRadius * 2, height: yRadius * SQRT3 }
    }
  }

  if (isFiniteNumber(input)) {
    return { width: input, height: input }
  }

  throw new TypeError(
    `Invalid size: 
        ${JSON.stringify(input)}. 
        Dimensions must be expressed as an Ellipse ({ xRadius: number, yRadius: number }), a Rectangle ({ width: number, height: number }) or a number.`
  )
}
