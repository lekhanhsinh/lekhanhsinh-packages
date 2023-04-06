import { type CubeCoordinates, type PointCoordinates } from '../../../types'
import { type SquareSettings } from '../../types'

export const toPixel = (
  { q = 0, r = 0 }: Omit<Partial<CubeCoordinates>, 'direction'>,
  { size: { width, height }, origin, inverse }: SquareSettings
): Omit<PointCoordinates, 'direction'> => {
  const x = (q - 0.5) * width + origin.x
  const y = (r + 0.5) * height + origin.y
  return { x: inverse.x ? -x : x, y: inverse.y ? -y : y }
}
