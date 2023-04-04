import { type TupleCoordinates } from '../../types'
import { isFiniteNumber } from './isFiniteNumber'

export const isTuple = (value: unknown): value is TupleCoordinates => {
  if (!Array.isArray(value)) return false

  let result = false
  if (value[0] != null) {
    result = true
    if (!isFiniteNumber(value[0])) {
      return false
    }
  }
  if (value[1] != null) {
    result = true
    if (!isFiniteNumber(value[1])) {
      return false
    }
  }
  if (value[2] != null) {
    result = true
    if (!isFiniteNumber(value[2])) {
      return false
    }
  }
  return result
}
