import { DIRECTION } from '../../constants'
import { type CubeCoordinates } from '../../types'
import { isCube } from '../checkers'

export const stringToCube = (str: string): CubeCoordinates => {
  let { q, r, s, direction } = JSON.parse(str) ?? {}
  if (typeof direction === 'string') {
    direction = DIRECTION[direction as keyof typeof DIRECTION]
  }
  if (q == null || r == null || s == null || !isCube({ q, r, s, direction })) {
    throw new Error(`String is not valid cube coordinates. Received: ${str}`)
  }
  return { q, r, s, direction }
}
