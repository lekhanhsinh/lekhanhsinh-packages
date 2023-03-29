import { type SquareSettings } from '../../../Node/types'
import { DIRECTION } from '../../../constants'
import { type EdgeCoordinates, type PointCoordinates } from '../../../types'

export const toPixel = (
  { q, r, direction }: EdgeCoordinates,
  { size: { width, height }, anchor, inverse }: SquareSettings
): PointCoordinates => {
  const x = !inverse.x
    ? (q + (direction === DIRECTION.N ? 0.5 : 0) + anchor.x) * width
    : -(q - (direction === DIRECTION.N ? 0.5 : 0) - anchor.x) * width
  const y = !inverse.y
    ? (r + (direction === DIRECTION.W ? 0.5 : 0) + anchor.y) * height
    : -(r - (direction === DIRECTION.W ? 0.5 : 0) - anchor.y) * height
  return { x, y }
}
