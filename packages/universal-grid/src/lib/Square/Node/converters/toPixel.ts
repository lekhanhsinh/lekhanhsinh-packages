import { type PointCoordinates, type CubeCoordinates } from '../../../types'
import { type SquareSettings } from '../../types'

export const toPixel = (
  { q = 0, r = 0 }: Omit<Partial<CubeCoordinates>, 'direction'>,
  { size: { width, height }, origin, inverse }: SquareSettings
): Omit<PointCoordinates, 'direction'> => {
  const x = q * width + origin.x
  const y = r * height + origin.y
  return { x: inverse.x ? -x : x, y: inverse.y ? -y : y }
}
