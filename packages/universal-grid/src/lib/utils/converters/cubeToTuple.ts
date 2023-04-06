import { type CubeCoordinates, type TupleCoordinates } from '../../types'

export const cubeToTuple = ({
  q = 0,
  r = 0,
  s = 0,
  direction,
}: Partial<CubeCoordinates>): TupleCoordinates =>
  direction != null ? [q, r, s, direction] : [q, r, s]
