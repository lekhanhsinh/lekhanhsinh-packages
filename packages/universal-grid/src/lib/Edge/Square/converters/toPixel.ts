import { type SquareSettings } from '../../../Node/types'
import { DIRECTION } from '../../../constants'
import { type EdgeCoordinates, type PointCoordinates } from '../../../types'

export const toPixel = (
  { q, r, direction }: EdgeCoordinates,
  { size: { width, height }, anchor }: SquareSettings
): PointCoordinates => {
  return {
    x: (q + (direction === DIRECTION.N ? 0.5 : 0) + anchor.x) * width,
    y: (r + (direction === DIRECTION.W ? 0.5 : 0) + anchor.y) * height,
  }
}
