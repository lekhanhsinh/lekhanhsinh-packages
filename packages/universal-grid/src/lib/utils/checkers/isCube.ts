import { type CubeCoordinates } from '../../types'
import { isNumber } from './isNumber'

export const isCube = (value: unknown): value is CubeCoordinates => {
  if (typeof value !== 'object' || value == null) return false

  let result = false
  if ((value as CubeCoordinates).q != null) {
    result = true
    if (!isNumber((value as CubeCoordinates).q)) {
      return false
    }
  }
  if ((value as CubeCoordinates).r != null) {
    result = true
    if (!isNumber((value as CubeCoordinates).r)) {
      return false
    }
  }
  if ((value as CubeCoordinates).s != null) {
    result = true
    if (!isNumber((value as CubeCoordinates).s)) {
      return false
    }
  }
  return result
}
