import { type PointCoordinates, type CubeCoordinates } from '../../../types'
import { NodeTriangle } from '../../Node'
import { roundCubeTriangle } from '../../roundCubeTriangle'
import { type TriangleSettings } from '../../types'
import { toPixel } from './toPixel'

export const fromPixel = (
  { x = 0, y = 0 }: Omit<Partial<PointCoordinates>, 'direction'>,
  settings: TriangleSettings
): Omit<CubeCoordinates, 'direction'> => {
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

  const node = new NodeTriangle({ q, r, s })
  const corners = Array.from(node.corners().values())
  let corner = corners.at(0) as Omit<CubeCoordinates, 'direction'>
  let pixel = toPixel(corner, settings)

  for (const c of corners) {
    const p = toPixel(c, settings)
    if (
      Math.pow(p.x - x, 2) + Math.pow(p.y - y, 2) <
      Math.pow(pixel.x - x, 2) + Math.pow(pixel.y - y, 2)
    ) {
      corner = c
      pixel = p
    }
  }
  return corner
}
