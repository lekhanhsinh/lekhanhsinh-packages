import { type CubeCoordinates, type PointCoordinates } from '../../../types'
import { type SquareSettings } from '../../types'

export const toPixel = (
  { q = 0, r = 0 }: Omit<Partial<CubeCoordinates>, 'direction'>,
  { size: { width, height }, anchor, inverse }: SquareSettings
): Omit<PointCoordinates, 'direction'> => {
  const x = !inverse.x ? (q + anchor.x) * width : -(q - anchor.x) * width
  const y = !inverse.y ? (r + anchor.y) * height : -(r - anchor.y) * height
  return { x, y }
}
