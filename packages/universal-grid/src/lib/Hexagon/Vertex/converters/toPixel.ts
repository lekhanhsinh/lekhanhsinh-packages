import { DIRECTION, SQRT3, SQRT3_2 } from '../../../constants'
import { type CubeCoordinates, type PointCoordinates } from '../../../types'
import { completeCubeHexagon } from '../../completeCubeHexagon'
import { type HexagonSettings } from '../../types'

export const toPixel = (
  coordinates: Partial<CubeCoordinates>,
  { size: { width, height }, origin, inverse, isPointy }: HexagonSettings
): Omit<PointCoordinates, 'direction'> => {
  const { q, s } = completeCubeHexagon(coordinates)
  const direction =
    coordinates.direction ?? (isPointy ? DIRECTION.N : DIRECTION.W)

  let x = 0
  let y = 0
  if (isPointy) {
    x = (q * SQRT3 + SQRT3_2 * s) * (width / 2)
    y = (s * (3 / 2) - Math.sin(direction)) * (height / 2)
  } else {
    x = (q * (3 / 2) + Math.cos(direction)) * (width / 2)
    y = (q * SQRT3_2 + SQRT3 * s) * (height / 2)
  }
  return {
    x: (inverse.x ? -x : x) + origin.x,
    y: (inverse.y ? y : -y) - origin.y,
  }
}
