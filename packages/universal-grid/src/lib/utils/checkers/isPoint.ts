import { type PointCoordinates } from '../../types'

export const isPoint = (value: unknown): value is PointCoordinates =>
  typeof value === 'object' &&
  value != null &&
  Number.isFinite((value as PointCoordinates).x) &&
  Number.isFinite((value as PointCoordinates).y)
