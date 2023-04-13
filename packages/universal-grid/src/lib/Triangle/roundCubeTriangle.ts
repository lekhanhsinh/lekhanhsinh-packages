import { type CubeCoordinates } from '../types'

export const roundCubeTriangle = ({
  q,
  r,
  s,
}: Omit<CubeCoordinates, 'direction'>): Omit<CubeCoordinates, 'direction'> => ({
  q: Math.ceil(q),
  r: Math.floor(r) + 1,
  s: Math.ceil(s),
})
