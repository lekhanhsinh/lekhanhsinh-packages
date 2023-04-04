import { DIRECTION } from '../../../constants'
import { type CubeCoordinates, type PointCoordinates } from '../../../types'
import { type SquareSettings } from '../../types'

export const toPixel = (
  { q = 0, r = 0, direction = DIRECTION.N }: Partial<CubeCoordinates>,
  { size: { width, height }, anchor, inverse }: SquareSettings
): Omit<PointCoordinates, 'direction'> => {
  const x = !inverse.x
    ? (q + Math.sin(direction) / 2 + anchor.x) * width
    : -(q - Math.sin(direction) / 2 - anchor.x) * width
  const y = !inverse.y
    ? (r - Math.cos(direction) / 2 + anchor.y) * height
    : -(r + Math.cos(direction) / 2 - anchor.y) * height
  return { x, y }
}
