import { type CubeCoordinates, type PointCoordinates } from '../../../types'
import { type TriangleSettings } from '../../types'
import { SQRT3_3 } from '../../../constants'

export const toPixel = (
  { q = 0, r = 0, s = 0, direction = 0 }: Partial<CubeCoordinates>,
  { size: { width, height }, origin, inverse }: TriangleSettings
): Omit<PointCoordinates, 'direction'> => {
  const x = (0.5 * q + -0.5 * s + Math.cos(direction) * (SQRT3_3 / 2)) * width
  const y =
    ((-1 / 3) * q +
      (2 / 3) * r -
      (1 / 3) * s +
      (1 / 3) * +Math.sin(direction)) *
    height
  return {
    x: (inverse.x ? -x : x) + origin.x,
    y: (inverse.y ? -y : y) + origin.y,
  }
}
