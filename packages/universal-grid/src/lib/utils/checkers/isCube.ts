import { type CubeCoordinates } from '../../types'

export const isCube = (value: unknown): value is CubeCoordinates =>
  typeof value === 'object' &&
  value != null &&
  Number.isFinite((value as CubeCoordinates).q) &&
  Number.isFinite((value as CubeCoordinates).r) &&
  Number.isFinite((value as CubeCoordinates).s)
