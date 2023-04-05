import { type PointCoordinates, type CubeCoordinates } from '../../../types'
import { type SquareSettings } from '../../types'

export const fromPixel = (
  { x = 0, y = 0 }: Omit<Partial<PointCoordinates>, 'direction'>,
  { size: { width, height }, anchor, inverse }: SquareSettings
): Omit<CubeCoordinates, 'direction'> => {
  let q = !inverse.x
    ? Math.round(x / width - anchor.x)
    : Math.round(-x / width + anchor.x)
  let r = !inverse.y
    ? Math.round(y / height - anchor.y)
    : Math.round(-y / height + anchor.y)

  // to avoid -0
  q += 0
  r += 0
  return { q, r, s: 0 }
}
