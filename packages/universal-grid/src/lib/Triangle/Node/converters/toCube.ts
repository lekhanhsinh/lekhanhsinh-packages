import { type PartCoordinates, type CubeCoordinates } from '../../../types'
import { isCube, isOffset, isPoint, isTuple, tupleToCube } from '../../../utils'
import { type TriangleSettings } from '../../types'
import { type NodeTriangle } from '../NodeTriangle'
import { fromPixel } from './fromPixel'
import { offsetToCube } from './offsetToCube'

export const toCube = (
  coordinates: PartCoordinates<NodeTriangle>,
  settings: TriangleSettings
): Omit<CubeCoordinates, 'direction'> => {
  if (isCube(coordinates)) {
    return coordinates
  } else if (isOffset(coordinates)) {
    return offsetToCube(coordinates, settings)
  } else if (isTuple(coordinates)) {
    const { q, r, s } = tupleToCube(coordinates)
    return { q: q ?? 0, r: r ?? 0, s: s ?? 0 }
  } else if (isPoint(coordinates)) {
    return fromPixel(coordinates, settings)
  }
  throw new TypeError(
    `Invalid coordinates. Recieved:
        ${JSON.stringify(coordinates)}.`
  )
}
