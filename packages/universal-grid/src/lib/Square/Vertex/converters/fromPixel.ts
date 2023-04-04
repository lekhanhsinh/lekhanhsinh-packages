import { type PointCoordinates, type CubeCoordinates } from '../../../types'
import { type SquareSettings } from '../../types'

export const fromPixel = (
  { x = 0, y = 0 }: Omit<Partial<PointCoordinates>, 'direction'>,
  { size: { width, height }, anchor, inverse }: SquareSettings
): Omit<CubeCoordinates, 'direction'> => {
  const q = !inverse.x
    ? Math.floor(x / width - anchor.x)
    : Math.floor(-x / width + anchor.x)
  const r = !inverse.y
    ? Math.floor(y / height - anchor.y)
    : Math.floor(-y / height + anchor.y)
  return { q, r, s: 0 }
}
