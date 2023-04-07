import { type PartCoordinates, type CubeCoordinates } from '../../../types'
import { isCube, isOffset, isPoint, isTuple, tupleToCube } from '../../../utils'
import { type SquareSettings } from '../../types'
import { type NodeSquare } from '../NodeSquare'
import { fromPixel } from './fromPixel'

export const toCube = (
  coordinates: PartCoordinates<NodeSquare>,
  settings: SquareSettings
): Omit<CubeCoordinates, 'direction'> => {
  if (isCube(coordinates)) {
    return coordinates
  } else if (isOffset(coordinates)) {
    return { q: coordinates.col, r: coordinates.row, s: 0 }
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
