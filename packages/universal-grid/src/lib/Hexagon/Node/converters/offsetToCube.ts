import { type HexagonSettings } from '../..'
import { type CubeCoordinates, type OffsetCoordinates } from '../../../types'

export const offsetToCube = (
  { col = 0, row = 0 }: Omit<Partial<OffsetCoordinates>, 'direction'>,
  { isPointy, offset }: HexagonSettings
): Omit<CubeCoordinates, 'direction'> => {
  let q = 0
  let s = 0
  if (isPointy) {
    q = col - (row - (row & 1) * offset) / 2
    s = row
  } else {
    q = col
    s = row - (col - (col & 1) * offset) / 2
  }
  return { q, r: -q - s, s }
}
