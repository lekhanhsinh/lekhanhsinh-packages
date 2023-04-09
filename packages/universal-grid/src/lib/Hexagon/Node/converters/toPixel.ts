import { type HexagonSettings } from '../../../Hexagon/types'
import { SQRT3, SQRT3_2 } from '../../../constants'
import { type PointCoordinates, type CubeCoordinates } from '../../../types'
import { completeCubeHexagon } from '../../completeCubeHexagon'

export const toPixel = (
  coordinates: Omit<Partial<CubeCoordinates>, 'direction'>,
  { size: { width, height }, origin, inverse, isPointy }: HexagonSettings
): Omit<PointCoordinates, 'direction'> => {
  const { q, s } = completeCubeHexagon(coordinates)
  let x = 0
  let y = 0
  if (isPointy) {
    x = (q * SQRT3 + SQRT3_2 * s) * (width / 2)
    y = s * (3 / 2) * (height / 2)
  } else {
    x = q * (3 / 2) * (width / 2)
    y = (q * SQRT3_2 + SQRT3 * s) * (height / 2)
  }
  return {
    x: (inverse.x ? -x : x) + origin.x,
    y: (inverse.y ? y : -y) - origin.y,
  }
}
