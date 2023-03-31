import { type SquareSettings } from '../../../Node'
import { type PartCoordinates, type CubeCoordinates } from '../../../types'
import { isCube, isOffset, isTuple, tupleToCube } from '../../../utils'
import { type VertexSquare } from '../Square'
import { fromPixel } from './fromPixel'

export const toCube = (
  coordinates: PartCoordinates<VertexSquare>,
  settings: SquareSettings
): CubeCoordinates => {
  if (isCube(coordinates)) {
    return coordinates
  } else if (isOffset(coordinates)) {
    return { q: coordinates.col, r: coordinates.row, s: 0 }
  } else if (isTuple(coordinates)) {
    return tupleToCube(coordinates)
  } else {
    return fromPixel(coordinates, settings)
  }
}
