import { type SquareSettings } from '../../../Node/types'
import { type PointCoordinates, type CubeCoordinates } from '../../../types'

export const fromPixel = (
  { x = 0, y = 0 }: PointCoordinates,
  { size: { width, height }, anchor }: SquareSettings
): CubeCoordinates => {
  return {
    q: Math.floor(x / width - anchor.x),
    r: Math.floor(y / height - anchor.y),
    s: 0,
  }
}
