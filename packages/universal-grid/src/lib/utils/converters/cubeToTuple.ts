import { type CubeCoordinates, type TupleCoordinates } from '../../types'

export const cubeToTuple = ({
  q,
  r,
  s,
  direction,
}: CubeCoordinates): TupleCoordinates =>
  direction != null ? [q, r, s, direction] : [q, r, s]
