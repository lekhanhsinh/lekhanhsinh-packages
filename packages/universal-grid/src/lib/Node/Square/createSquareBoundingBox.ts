import { type BoundingBox, type Ellipse } from '../../types'

export const createSquareBoundingBox = (
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
    return { width: xRadius * Math.SQRT2, height: yRadius * Math.SQRT2 }
  }

  if (Number.isFinite(input)) {
    return { width: input as number, height: input as number }
  }

  throw new TypeError(
    `Invalid size: 
        ${JSON.stringify(input)}. 
        Dimensions must be expressed as an Ellipse ({ xRadius: number, yRadius: number }), a Rectangle ({ width: number, height: number }) or a number.`
  )
}
