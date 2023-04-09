import { type PointCoordinates, type CubeCoordinates } from '../../../types'
import { type SquareSettings } from '../../types'

export const toPixel = (
  { q = 0, r = 0 }: Omit<Partial<CubeCoordinates>, 'direction'>,
  { size: { width, height }, origin, inverse }: SquareSettings
): Omit<PointCoordinates, 'direction'> => {
  const x = q * width
  const y = r * height
  return {
    x: (inverse.x ? -x : x) + origin.x,
    y: (inverse.y ? -y : y) + origin.y,
  }
}
