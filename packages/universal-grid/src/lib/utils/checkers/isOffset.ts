import { type OffsetCoordinates } from '../../types'
import { isFiniteNumber } from './isFiniteNumber'

export const isOffset = (value: unknown): value is OffsetCoordinates => {
  if (typeof value !== 'object' || value == null) return false

  let result = false
  if ((value as OffsetCoordinates).col != null) {
    result = true
    if (!isFiniteNumber((value as OffsetCoordinates).col)) {
      return false
    }
  }
  if ((value as OffsetCoordinates).row != null) {
    result = true
    if (!isFiniteNumber((value as OffsetCoordinates).row)) {
      return false
    }
  }
  return result
}
