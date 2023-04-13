import { type PointCoordinates, type CubeCoordinates } from '../../../types'
import { roundCubeTriangle } from '../..'
import { type TriangleSettings } from '../../types'

export const fromPixel = (
  { x = 0, y = 0 }: Omit<Partial<PointCoordinates>, 'direction'>,
  { size: { width, height }, origin, inverse }: TriangleSettings
): Omit<CubeCoordinates, 'direction'> => {
  const _x = inverse.x ? -(x - origin.x) : x - origin.x
  const _y = inverse.y ? -(y - origin.y) : y - origin.y
  const q = _x / width - ((1 / 2) * _y) / height
  const r = _y / height
  const s = -_x / width - ((1 / 2) * _y) / height

  return roundCubeTriangle({ q, r, s })
}
