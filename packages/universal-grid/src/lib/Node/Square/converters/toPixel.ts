import { type PointCoordinates, type CubeCoordinates } from '../../../types'
import { type SquareSettings } from '../../types'

export const toPixel = (
  node: CubeCoordinates,
  { size: { width, height }, anchor }: SquareSettings
): PointCoordinates => {
  return {
    x: (node.q + 0.5 + anchor.x) * width,
    y: (node.r + 0.5 + anchor.y) * height,
  }
}
