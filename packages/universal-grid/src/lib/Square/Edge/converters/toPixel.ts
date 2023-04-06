import { DIRECTION } from '../../../constants'
import { type CubeCoordinates, type PointCoordinates } from '../../../types'
import { type SquareSettings } from '../../types'

export const toPixel = (
  { q = 0, r = 0, direction = DIRECTION.N }: Partial<CubeCoordinates>,
  { size: { width, height }, origin, inverse }: SquareSettings
): Omit<PointCoordinates, 'direction'> => {
  const x = (q + Math.cos(direction) / 2) * width + origin.x
  const y = (r + Math.sin(direction) / 2) * height + origin.y
  return { x: inverse.x ? -x : x, y: inverse.y ? -y : y }
}
