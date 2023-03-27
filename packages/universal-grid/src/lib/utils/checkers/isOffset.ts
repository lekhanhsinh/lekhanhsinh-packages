import { type OffsetCoordinates } from '../../types'

export const isOffset = (value: unknown): value is OffsetCoordinates =>
  typeof value === 'object' &&
  value != null &&
  Number.isFinite((value as OffsetCoordinates).col) &&
  Number.isFinite((value as OffsetCoordinates).row)
