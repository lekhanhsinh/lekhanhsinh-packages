import { DIRECTION } from '../../../constants'
import { type CubeCoordinates, type PointCoordinates } from '../../../types'
import { type SquareSettings } from '../../types'

export const fromPixel = (
  { x = 0, y = 0, direction }: Partial<PointCoordinates>,
  { size: { width, height }, anchor, inverse }: SquareSettings
): Required<CubeCoordinates> => {
  const sq = !inverse.x ? x / width - anchor.x : -x / width + anchor.x
  const sr = !inverse.y ? y / height - anchor.y : -y / height + anchor.y
  const q = Math.floor(sq)
  const r = Math.floor(sr)
  const _direction =
    direction ??
    (Math.abs(Math.abs(sq - q)) < Math.abs(Math.abs(sr - r))
      ? DIRECTION.W
      : DIRECTION.N)
  return { q, r, s: 0, direction: _direction }
}
