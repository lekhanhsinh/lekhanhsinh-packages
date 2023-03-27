import { type CubeCoordinates } from '../../types'

export const cubeToString = ({
  q = 0,
  r = 0,
  s = 0,
}: Partial<CubeCoordinates>): string => JSON.stringify({ q, r, s })
