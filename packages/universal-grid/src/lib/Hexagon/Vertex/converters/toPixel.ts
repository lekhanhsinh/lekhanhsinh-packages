import { DIRECTION, SQRT3, SQRT3_2 } from '../../../constants'
import { type CubeCoordinates, type PointCoordinates } from '../../../types'
import { completeCubeHexagon } from '../../completeCubeHexagon'
import { type HexagonSettings } from '../../types'

export const toPixel = (
  coordinates: Partial<CubeCoordinates>,
  { size: { width, height }, anchor, inverse, isPointy }: HexagonSettings
): Omit<PointCoordinates, 'direction'> => {
  const { q, r } = completeCubeHexagon(coordinates)
  const direction =
    coordinates.direction ?? (isPointy ? DIRECTION.N : DIRECTION.W)
  const x = !inverse.x
    ? (q * SQRT3 + SQRT3_2 * r - Math.cos(direction) + anchor.x) * width
    : -(q * SQRT3 - SQRT3_2 * r + Math.cos(direction) - anchor.x) * width
  const y = !inverse.y
    ? (r * (3 / 2) - Math.cos(direction) + anchor.y) * height
    : -(r * (3 / 2) + Math.cos(direction) - anchor.y) * height
  return { x, y }
}
