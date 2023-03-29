import { type PointCoordinates, type CubeCoordinates } from '../../../types'
import { type SquareSettings } from '../../types'

export const toPixel = (
  node: CubeCoordinates,
  { size: { width, height }, anchor, inverse }: SquareSettings
): PointCoordinates => {
  const x = inverse.x
    ? (node.q + 0.5 + anchor.x) * width
    : -(node.q - 0.5 - anchor.x) * width
  const y = inverse.y
    ? (node.r + 0.5 + anchor.y) * height
    : -(node.r - 0.5 - anchor.y) * height
  return { x, y }
}
