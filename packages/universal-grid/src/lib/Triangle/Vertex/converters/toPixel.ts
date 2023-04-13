import { type CubeCoordinates, type PointCoordinates } from '../../../types'
import { isPointUp } from '../../isPointUp'
import { type TriangleSettings } from '../../types'

export const toPixel = (
  { q = 0, r = 0, s = 0 }: Omit<Partial<CubeCoordinates>, 'direction'>,
  { size: { width, height }, origin, inverse }: TriangleSettings
): Omit<PointCoordinates, 'direction'> => {
  const pointUp = isPointUp({ q, r, s })
  const x = (0.5 * q + -0.5 * s - 0.5) * width
  const y =
    ((-1 / 3) * q + (2 / 3) * r - (1 / 3) * s + (1 / 3) * (pointUp ? -1 : 1)) *
    height
  return {
    x: (inverse.x ? -x : x) + origin.x,
    y: (inverse.y ? -y : y) + origin.y,
  }
}
