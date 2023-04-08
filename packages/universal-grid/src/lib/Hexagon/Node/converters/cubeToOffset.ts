import { completeCubeHexagon, type HexagonSettings } from '../..'
import { type CubeCoordinates, type OffsetCoordinates } from '../../../types'

export const cubeToOffset = (
  coordinates: Omit<Partial<CubeCoordinates>, 'direction'>,
  { isPointy, offset }: HexagonSettings
): Omit<OffsetCoordinates, 'direction'> => {
  const { q, s } = completeCubeHexagon(coordinates)
  let col = 0
  let row = 0
  if (isPointy) {
    col = q + (s - (s & 1) * offset) / 2
    row = s
  } else {
    col = q
    row = s + (q - (q & 1) * offset) / 2
  }
  return { col, row }
}
