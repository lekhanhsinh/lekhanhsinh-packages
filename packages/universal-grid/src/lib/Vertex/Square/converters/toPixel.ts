import { type SquareSettings } from '../../../Node/types'
import { type CubeCoordinates, type PointCoordinates } from '../../../types'

export const toPixel = (
  { q, r }: CubeCoordinates,
  { size: { width, height }, anchor, inverse }: SquareSettings
): PointCoordinates => {
  const x = !inverse.x ? (q + anchor.x) * width : -(q - anchor.x) * width
  const y = !inverse.y ? (r + anchor.y) * height : -(r - anchor.y) * height
  return { x, y }
}
