import { type CubeCoordinates } from '../types'
import { completeCubeHexagon } from './completeCubeHexagon'

export const roundCubeHexagon = (
  coordinates: Omit<Partial<CubeCoordinates>, 'direction'>
): CubeCoordinates => {
  const { q, r, s } = completeCubeHexagon(coordinates)
  let roundedQ = Math.round(q)
  let roundedR = Math.round(r)
  let roundedS = Math.round(s)
  const diffQ = Math.abs(q - roundedQ)
  const diffR = Math.abs(r - roundedR)
  const diffS = Math.abs(s - roundedS)

  if (diffQ > diffR && diffQ > diffS) {
    roundedQ = -roundedR - roundedS
  } else if (diffR > diffS) {
    roundedR = -roundedQ - roundedS
  } else {
    roundedS = -roundedQ - roundedR
  }

  // to avoid -0
  return { q: roundedQ + 0, r: roundedR + 0, s: roundedS + 0 }
}
