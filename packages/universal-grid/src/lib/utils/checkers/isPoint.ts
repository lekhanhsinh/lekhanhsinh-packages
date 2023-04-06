import { type PointCoordinates } from '../../types'
import { isFiniteNumber } from './isFiniteNumber'

export const isPoint = (value: unknown): value is PointCoordinates => {
  if (typeof value !== 'object' || value == null) return false

  let result = false
  if ((value as PointCoordinates).x != null) {
    result = true
    if (!isFiniteNumber((value as PointCoordinates).x)) {
      return false
    }
  }
  if ((value as PointCoordinates).y != null) {
    result = true
    if (!isFiniteNumber((value as PointCoordinates).y)) {
      return false
    }
  }
  if ((value as PointCoordinates).direction != null) {
    if (!isFiniteNumber((value as PointCoordinates).direction)) {
      return false
    }
  }
  return result
}
