import { type PointCoordinates, type CubeCoordinates } from '../../../types'
import { type SquareSettings } from '../../types'

export const fromPixel = (
  { x = 0, y = 0 }: PointCoordinates,
  { size: { width, height }, anchor, inverse }: SquareSettings
): CubeCoordinates => {
  const q = !inverse.x
    ? Math.floor(x / width - 0.5 - anchor.x)
    : Math.floor(-x / width + 0.5 + anchor.x)
  const r = !inverse.y
    ? Math.floor(y / height - 0.5 - anchor.y)
    : Math.floor(-y / height + 0.5 + anchor.y)

  return { q, r, s: 0 }
}
