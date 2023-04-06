import { type CubeCoordinates } from '../../types'
import { isCube } from '../checkers'

export const stringToCube = (str: string): CubeCoordinates => {
  const { q, r, s, direction } = JSON.parse(str) ?? {}
  if (q == null || r == null || s == null || !isCube({ q, r, s, direction })) {
    throw new Error(`String is not valid cube coordinates. Received: ${str}`)
  }
  return { q, r, s, direction }
}
