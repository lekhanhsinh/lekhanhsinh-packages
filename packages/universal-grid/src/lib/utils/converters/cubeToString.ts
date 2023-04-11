import { type CubeCoordinates } from '../../types'
import { directionToString } from './directionToString'

export const cubeToString = (
  { q = 0, r = 0, s = 0, direction }: Partial<CubeCoordinates>,
  options?: { keepDirection: boolean }
): string => {
  const { keepDirection = false } = options ?? {}
  return JSON.stringify({
    q,
    r,
    s,
    direction:
      direction != null
        ? keepDirection
          ? direction
          : directionToString(direction)
        : undefined,
  })
}
