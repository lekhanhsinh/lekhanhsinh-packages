import { isPointUp, type TriangleSettings } from '../../..'
import { type CubeCoordinates, type OffsetCoordinates } from '../../../types'

export const cubeToOffset = (
  { q = 0, r = 0, s = 0 }: Omit<Partial<CubeCoordinates>, 'direction'>,
  { offset }: TriangleSettings
): Omit<OffsetCoordinates, 'direction'> => {
  const n =
    offset === 1
      ? Number(!isPointUp({ q, r, s }))
      : Number(isPointUp({ q, r, s }))
  const col = q * 2 - n
  const row = r

  return { col, row }
}
