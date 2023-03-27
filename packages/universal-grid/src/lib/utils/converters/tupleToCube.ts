import { type CubeCoordinates, type TupleCoordinates } from '../../types'

export const tupleToCube = ([
  q = 0,
  r = 0,
  s = 0,
]: Partial<TupleCoordinates>): CubeCoordinates => ({ q, r, s })
