import { type SquareSettings } from '../../../Node'
import {
  type NodeCoordinates,
  type CubeCoordinates,
  type PointCoordinates,
} from '../../../types'
import { isCube, isOffset, isTuple, tupleToCube } from '../../../utils'
import { fromPixel } from './fromPixel'

export const toCube = (
  coordinates: NodeCoordinates,
  settings: SquareSettings
): CubeCoordinates => {
  if (isCube(coordinates)) {
    return coordinates
  } else if (isOffset(coordinates)) {
    return { q: coordinates.col, r: coordinates.row, s: 0 }
  } else if (isTuple(coordinates)) {
    return tupleToCube(coordinates)
  } else {
    return fromPixel(coordinates as PointCoordinates, settings)
  }
}
