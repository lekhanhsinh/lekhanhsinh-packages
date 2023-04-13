import { type CubeCoordinates } from '../types'

const possibleSum = [1, 2]
export const isTriangle = (node: CubeCoordinates): boolean =>
  possibleSum.includes(node.q + node.r + node.s)
