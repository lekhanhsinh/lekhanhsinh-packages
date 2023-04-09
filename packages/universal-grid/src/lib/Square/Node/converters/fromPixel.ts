import { type PointCoordinates, type CubeCoordinates } from '../../../types'
import { type SquareSettings } from '../../types'

export const fromPixel = (
  { x = 0, y = 0 }: Omit<Partial<PointCoordinates>, 'direction'>,
  { size: { width, height }, origin, inverse }: SquareSettings
): Omit<CubeCoordinates, 'direction'> => {
  const _x = (inverse.x ? -x : x) - origin.x
  const _y = (inverse.y ? -y : y) - origin.y
  let q = Math.round(_x / width)
  let r = Math.round(_y / height)

  // to avoid -0
  q += 0
  r += 0
  return { q, r, s: 0 }
}
