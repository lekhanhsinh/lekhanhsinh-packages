import { type CubeCoordinates } from '../../types'

export const stringToCube = (str: string): CubeCoordinates => {
  const { q, r, s } = JSON.parse(str) ?? {}
  if (q == null || r == null || s == null) {
    throw new Error(`String is not valid cube coordinates. Received: ${str}`)
  }
  return { q, r, s }
}
