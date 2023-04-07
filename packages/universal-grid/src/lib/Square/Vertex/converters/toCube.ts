import {
  type PartCoordinates,
  type CubeCoordinates,
  type PointCoordinates,
} from '../../../types'
import { isCube, isOffset, isTuple, tupleToCube } from '../../../utils'
import { type SquareSettings } from '../../types'
import { type VertexSquare } from '../VertexSquare'
import { fromPixel } from './fromPixel'

export const toCube = (
  coordinates: PartCoordinates<VertexSquare>,
  settings: SquareSettings
): Omit<CubeCoordinates, 'direction'> => {
  if (isCube(coordinates)) {
    return coordinates
  } else if (isOffset(coordinates)) {
    return { q: coordinates.col, r: coordinates.row, s: 0 }
  } else if (isTuple(coordinates)) {
    const { q, r, s } = tupleToCube(coordinates)
    return { q: q ?? 0, r: r ?? 0, s: s ?? 0 }
  } else {
    return fromPixel(coordinates as PointCoordinates, settings)
  }
}
