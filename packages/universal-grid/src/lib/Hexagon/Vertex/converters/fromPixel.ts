import { SQRT3_3 } from '../../../constants'
import { type PointCoordinates, type CubeCoordinates } from '../../../types'
import { defineNodeHexagon } from '../../Node'
import { roundCubeHexagon } from '../../roundCubeHexagon'
import { type HexagonSettings } from '../../types'
import { toPixel } from './toPixel'

export const fromPixel = (
  { x = 0, y = 0, direction }: Partial<PointCoordinates>,
  settings: HexagonSettings
): Required<CubeCoordinates> => {
  const {
    size: { width, height },
    origin,
    inverse,
    isPointy,
  } = settings
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
  const { q, r, s } = roundCubeHexagon({ q: sq, r: sr, s: ss })
  if (direction != null) {
    return { q, r, s: 0, direction }
  }

  const Hexagon = defineNodeHexagon(settings)
  const node = new Hexagon({ q, r, s })
  const corners = Array.from(node.corners().values())
  let corner = corners.at(0) as Required<CubeCoordinates>
  let pixel = toPixel(corner, settings)

  for (const c of corners) {
    const p = toPixel(c, settings)
    if (
      Math.pow(p.x - _x, 2) + Math.pow(p.y - _y, 2) <
      Math.pow(pixel.x - _x, 2) + Math.pow(pixel.y - _y, 2)
    ) {
      corner = c
      pixel = p
    }
  }

  return corner
}
