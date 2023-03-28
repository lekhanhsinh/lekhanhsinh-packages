import { type SquareSettings } from '../../../Node/types'
import { type CubeCoordinates, type PointCoordinates } from '../../../types'

export const toPixel = (
  { q, r }: CubeCoordinates,
  { size: { width, height }, anchor }: SquareSettings
): PointCoordinates => {
  return {
    x: (q + anchor.x) * width,
    y: (r + anchor.y) * height,
  }
}
