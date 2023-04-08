import { type HexagonSettings } from '../../../Hexagon/types'
import { SQRT3_3 } from '../../../constants'
import { type PointCoordinates, type CubeCoordinates } from '../../../types'
import { roundCubeHexagon } from '../../roundCubeHexagon'

export const fromPixel = (
  { x = 0, y = 0 }: Omit<Partial<PointCoordinates>, 'direction'>,
  { size: { width, height }, origin, inverse, isPointy }: HexagonSettings
): CubeCoordinates => {
  const _x = inverse.x ? -x : x
  const _y = inverse.y ? y : -y
  let sq = 0
  let sr = 0
  let ss = 0
  if (isPointy) {
    sq = (SQRT3_3 * (_x - origin.x) - (1 / 3) * (_y - origin.y)) / (width / 2)
    ss = ((2 / 3) * (_y - origin.y)) / (height / 2)
    sr = -sq - ss
  } else {
    sq = ((2 / 3) * (_x - origin.x)) / (width / 2)
    ss = (SQRT3_3 * (_y - origin.y) - (1 / 3) * (_x - origin.x)) / (width / 2)
    sr = -sq - ss
  }
  return roundCubeHexagon({ q: sq, r: sr, s: ss })
}
