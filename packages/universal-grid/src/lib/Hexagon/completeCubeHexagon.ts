import { type CubeCoordinates } from '../types'
import { isFiniteNumber } from '../utils/checkers/isFiniteNumber'

export function completeCubeHexagon({
  q,
  r,
  s,
}: Omit<Partial<CubeCoordinates>, 'direction'>): CubeCoordinates {
  const validQ = isFiniteNumber(q)
  const validR = isFiniteNumber(r)
  const validS = isFiniteNumber(s)

  if (validQ && validR && validS) return { q, r, s }

  if (validQ && validR) return { q, r, s: -q - r }

  if (validQ && validS) return { q, r: -q - s, s }

  if (validR && validS) return { q: -r - s, r, s }

  throw new TypeError(
    `In valid Coordinates. 
      Received: ${JSON.stringify({ q, r, s })}.`
  )
}
