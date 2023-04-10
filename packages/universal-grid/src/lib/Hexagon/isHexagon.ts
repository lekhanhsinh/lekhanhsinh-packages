import { type CubeCoordinates } from '../types'

export const isHexagon = ({ q, r, s }: CubeCoordinates): boolean =>
  q + r + s === 0
