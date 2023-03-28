import { type PointCoordinates, type CubeCoordinates } from '../../../types'
import { type SquareSettings } from '../../types'

export const fromPixel = (
  { x = 0, y = 0 }: PointCoordinates,
  { size: { width, height }, anchor }: SquareSettings
): CubeCoordinates => {
  return {
    q: Math.floor(x / width - 0.5 - anchor.x),
    r: Math.floor(y / height - 0.5 - anchor.y),
    s: 0,
  }
}
