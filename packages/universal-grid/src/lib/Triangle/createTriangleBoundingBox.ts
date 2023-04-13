import { SQRT3 } from '../constants'
import { type BoundingBox, type Ellipse } from '../types'
import { isFiniteNumber } from '../utils'

export const createTriangleBoundingBox = (
  input: number | BoundingBox | Ellipse
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
    return { width: xRadius * SQRT3, height: yRadius * (3 / 2) }
  }

  if (isFiniteNumber(input)) {
    return {
      width: input * SQRT3,
      height: input * (3 / 2),
    }
  }

  throw new TypeError(
    `Invalid size. Recieved:
        ${JSON.stringify(input)}.`
  )
}
