import { type OffsetCoordinates } from '../../types'
import { isNumber } from './isNumber'

export const isOffset = (value: unknown): value is OffsetCoordinates => {
  if (typeof value !== 'object' || value == null) return false

  let result = false
  if ((value as OffsetCoordinates).col != null) {
    result = true
    if (!isNumber((value as OffsetCoordinates).col)) {
      return false
    }
  }
  if ((value as OffsetCoordinates).row != null) {
    result = true
    if (!isNumber((value as OffsetCoordinates).row)) {
      return false
    }
  }
  return result
}
