import { type TupleCoordinates } from '../../types'

export const isTuple = (value: unknown): value is TupleCoordinates =>
  Array.isArray(value) && Number.isFinite(value[0]) && Number.isFinite(value[1])
