import { SQRT3_3 } from '../../../constants'
import { type CubeCoordinates, type PointCoordinates } from '../../../types'
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
  const _x = inverse.x ? -(x - origin.x) : x - origin.x
  const _y = inverse.y ? y + origin.y : -(y + origin.y)
  let sq = 0
  let sr = 0
  let ss = 0
  if (isPointy) {
    sq = (SQRT3_3 * _x - (1 / 3) * _y) / (width / 2)
    ss = ((2 / 3) * _y) / (height / 2)
    sr = -sq - ss
  } else {
    sq = ((2 / 3) * _x) / (width / 2)
    ss = (SQRT3_3 * _y - (1 / 3) * _x) / (height / 2)
    sr = -sq - ss
  }
  const { q, r, s } = roundCubeHexagon({ q: sq, r: sr, s: ss })
  if (direction != null) {
    return { q, r, s: 0, direction }
  }

  const Hexagon = defineNodeHexagon(settings)
  const node = new Hexagon({ q, r, s })
  const borders = Array.from(node.borders().values())
  let border = borders.at(0) as Required<CubeCoordinates>
  let pixel = toPixel(border, settings)
  for (const c of borders) {
    const p = toPixel(c, settings)
    if (
      Math.pow(p.x - x, 2) + Math.pow(p.y - y, 2) <
      Math.pow(pixel.x - x, 2) + Math.pow(pixel.y - y, 2)
    ) {
      border = c
      pixel = p
    }
  }

  return border
}
