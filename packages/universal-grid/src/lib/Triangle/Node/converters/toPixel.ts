import { type PointCoordinates, type CubeCoordinates } from '../../../types'
import { type TriangleSettings } from '../../types'

export const toPixel = (
  { q = 0, r = 0, s = 0 }: Omit<Partial<CubeCoordinates>, 'direction'>,
  { size: { width, height }, origin, inverse }: TriangleSettings
): Omit<PointCoordinates, 'direction'> => {
  const x = (0.5 * q + -0.5 * s) * width
  const y = ((-1 / 3) * q + (2 / 3) * r - (1 / 3) * s) * height
  return {
    x: (inverse.x ? -x : x) + origin.x,
    y: (inverse.y ? -y : y) + origin.y,
  }
}
