import { type TriangleSettings } from '../..'
import { type CubeCoordinates, type OffsetCoordinates } from '../../../types'

export const offsetToCube = (
  { col = 0, row = 0 }: Omit<Partial<OffsetCoordinates>, 'direction'>,
  { offset }: TriangleSettings
): Omit<CubeCoordinates, 'direction'> => {
  const n = offset === 1 ? Number((col & 1) === 1) : Number((col & 1) === 0)
  const q = Math.floor(col / 2)
  const r = row
  const s = n + 1 - r - q
  return { q, r, s }
}
