import { type CubeCoordinates, type TupleCoordinates } from '../../types'

export const cubeToTuple = ({
  q = 0,
  r = 0,
  s = 0,
}: Partial<CubeCoordinates>): TupleCoordinates => [q, r, s]
