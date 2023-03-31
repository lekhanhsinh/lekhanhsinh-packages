import { type SquareSettings } from '../../../Node/types'
import { DIRECTION } from '../../../constants'
import { type PointCoordinates, type EdgeCoordinates } from '../../../types'

export const fromPixel = (
  { x = 0, y = 0 }: Partial<PointCoordinates>,
  { size: { width, height }, anchor, inverse }: SquareSettings
): EdgeCoordinates => {
  const sq = !inverse.x ? x / width - anchor.x : -x / width + anchor.x
  const sr = !inverse.y ? y / height - anchor.y : -y / height + anchor.y
  const q = Math.floor(sq)
  const r = Math.floor(sr)
  const direction =
    Math.abs(Math.abs(sq - q)) < Math.abs(Math.abs(sr - r))
      ? DIRECTION.W
      : DIRECTION.N
  return { q, r, s: 0, direction }
}
