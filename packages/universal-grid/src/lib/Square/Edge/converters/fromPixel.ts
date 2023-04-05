import { DIRECTION } from '../../../constants'
import { type CubeCoordinates, type PointCoordinates } from '../../../types'
import { type SquareSettings } from '../../types'

export const fromPixel = (
  { x = 0, y = 0, direction }: Partial<PointCoordinates>,
  { size: { width, height }, anchor, inverse }: SquareSettings
): Required<CubeCoordinates> => {
  const sq = !inverse.x
    ? x / width - 0.5 - anchor.x
    : -x / width + 0.5 + anchor.x
  const sr = !inverse.y
    ? y / height - 0.5 - anchor.y
    : -y / height + 0.5 + anchor.y
  let q = Math.round(sq)
  let r = Math.round(sr)

  if (direction != null) {
    return { q, r, s: 0, direction }
  }

  let _direction = 0
  if (Math.abs(sq - q) > Math.abs(sr - r)) {
    _direction = DIRECTION.W
    q = sq > q ? q + 1 : q
  } else {
    _direction = DIRECTION.N
    r = sr < r ? r - 1 : r
  }

  // to avoid -0
  q += 0
  r += 0
  return { q, r, s: 0, direction: _direction }
}
