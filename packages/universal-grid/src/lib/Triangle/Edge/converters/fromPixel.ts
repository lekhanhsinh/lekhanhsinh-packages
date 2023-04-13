import { type CubeCoordinates, type PointCoordinates } from '../../../types'
import { NodeTriangle } from '../../Node'
import { roundCubeTriangle } from '../../roundCubeTriangle'
import { type TriangleSettings } from '../../types'
import { toPixel } from './toPixel'

export const fromPixel = (
  { x = 0, y = 0, direction }: Partial<PointCoordinates>,
  settings: TriangleSettings
): Required<CubeCoordinates> => {
  const {
    size: { width, height },
    origin,
    inverse,
  } = settings
  const _x = inverse.x ? -(x - origin.x) : x - origin.x
  const _y = inverse.y ? -(y - origin.y) : y - origin.y
  const sq = _x / width - ((1 / 2) * _y) / height
  const sr = _y / height
  const ss = -_x / width - ((1 / 2) * _y) / height
  const { q, r, s } = roundCubeTriangle({ q: sq, r: sr, s: ss })

  if (direction != null) {
    return { q, r, s: 0, direction }
  }

  const node = new NodeTriangle({ q, r, s })
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
