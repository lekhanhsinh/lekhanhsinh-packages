import { type CubeCoordinates } from '../../types'
import { isFiniteNumber } from './isFiniteNumber'

export const isCube = (value: unknown): value is CubeCoordinates => {
  if (typeof value !== 'object' || value == null) return false

  let result = false
  if ((value as CubeCoordinates).q != null) {
    result = true
    if (!isFiniteNumber((value as CubeCoordinates).q)) {
      return false
    }
  }
  if ((value as CubeCoordinates).r != null) {
    result = true
    if (!isFiniteNumber((value as CubeCoordinates).r)) {
      return false
    }
  }
  if ((value as CubeCoordinates).s != null) {
    result = true
    if (!isFiniteNumber((value as CubeCoordinates).s)) {
      return false
    }
  }
  if ((value as CubeCoordinates).direction != null) {
    if (!isFiniteNumber((value as CubeCoordinates).direction)) {
      return false
    }
  }
  return result
}
