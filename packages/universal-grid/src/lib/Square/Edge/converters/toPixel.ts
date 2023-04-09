import { type CubeCoordinates, type PointCoordinates } from '../../../types'
import { type SquareSettings } from '../../types'

export const toPixel = (
  { q = 0, r = 0, direction = 0 }: Partial<CubeCoordinates>,
  { size: { width, height }, origin, inverse }: SquareSettings
): Omit<PointCoordinates, 'direction'> => {
  const x = (q + Math.cos(direction) / 2) * width
  const y = (r + Math.sin(direction) / 2) * height
  return {
    x: (inverse.x ? -x : x) + origin.x,
    y: (inverse.y ? -y : y) + origin.y,
  }
}
