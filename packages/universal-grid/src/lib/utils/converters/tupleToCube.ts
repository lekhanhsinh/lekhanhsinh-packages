import { type CubeCoordinates, type TupleCoordinates } from '../../types'

export const tupleToCube = ([
  q = 0,
  r = 0,
  s = 0,
  direction,
]: Partial<TupleCoordinates>): CubeCoordinates =>
  direction != null ? { q, r, s, direction } : { q, r, s }
