import { type PointCoordinates, type CubeCoordinates } from '../../../types'
import { type SquareSettings } from '../../types'

export const toPixel = (
  { q, r }: CubeCoordinates,
  { size: { width, height }, anchor, inverse }: SquareSettings
): PointCoordinates => {
  const x = !inverse.x
    ? (q + 0.5 + anchor.x) * width
    : -(q - 0.5 - anchor.x) * width
  const y = !inverse.y
    ? (r + 0.5 + anchor.y) * height
    : -(r - 0.5 - anchor.y) * height
  return { x, y }
}
