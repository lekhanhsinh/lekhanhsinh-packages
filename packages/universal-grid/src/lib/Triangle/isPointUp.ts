import { type CubeCoordinates } from '../types'

export const isPointUp = ({ q, r, s }: CubeCoordinates): boolean =>
  q + r + s === 2
