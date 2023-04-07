import { type CubeCoordinates, type TupleCoordinates } from '../../types'

export const tupleToCube = ([
  q,
  r,
  s,
  direction,
]: Partial<TupleCoordinates>): Partial<CubeCoordinates> =>
  direction != null ? { q, r, s, direction } : { q, r, s }
