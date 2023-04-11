import { DIRECTION } from '../../constants'

export const directionToString = (value: number): string => {
  const index = Object.values(DIRECTION).indexOf(value as unknown as DIRECTION)
  const key = Object.keys(DIRECTION)[index]
  return key
}
