import { type SquareSettings } from '../../../Node/types'
import { DIRECTION } from '../../../constants'
import { type PointCoordinates, type EdgeCoordinates } from '../../../types'

export const fromPixel = (
  { x = 0, y = 0 }: PointCoordinates,
  { size: { width, height }, anchor }: SquareSettings
): EdgeCoordinates => {
  const sq = x / width - anchor.x
  const sr = y / height - anchor.y
  const q = Math.floor(sq)
  const r = Math.floor(sr)
  return {
    q,
    r,
    s: 0,
    direction:
      Math.abs(Math.abs(sq - q) - 0.5) > Math.abs(Math.abs(sr - r) - 0.5)
        ? DIRECTION.W
        : DIRECTION.N,
  }
}
