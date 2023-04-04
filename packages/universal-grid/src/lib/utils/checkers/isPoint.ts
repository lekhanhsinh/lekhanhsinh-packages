import { type PointCoordinates } from '../../types'

export const isPoint = (value: unknown): value is PointCoordinates => {
  if (typeof value !== 'object' || value == null) return false

  let result = false
  if ((value as PointCoordinates).x != null) {
    result = true
    if (!Number.isFinite((value as PointCoordinates).x)) {
      return false
    }
  }
  if ((value as PointCoordinates).y != null) {
    result = true
    if (!Number.isFinite((value as PointCoordinates).y)) {
      return false
    }
  }
  return result
}
