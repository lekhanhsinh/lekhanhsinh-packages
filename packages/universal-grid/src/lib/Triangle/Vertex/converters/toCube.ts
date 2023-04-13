import {
  type PartCoordinates,
  type CubeCoordinates,
  type PointCoordinates,
} from '../../../types'
import { isCube, isOffset, isTuple, tupleToCube } from '../../../utils'
import { offsetToCube } from '../../Node/converters'
import { type TriangleSettings } from '../../types'
import { type VertexTriangle } from '../VertexTriangle'
import { fromPixel } from './fromPixel'

export const toCube = (
  coordinates: PartCoordinates<VertexTriangle>,
  settings: TriangleSettings
): Omit<CubeCoordinates, 'direction'> => {
  if (isCube(coordinates)) {
    return coordinates
  } else if (isOffset(coordinates)) {
    return offsetToCube(coordinates, settings)
  } else if (isTuple(coordinates)) {
    const { q, r, s } = tupleToCube(coordinates)
    return { q: q ?? 0, r: r ?? 0, s: s ?? 0 }
  } else {
    return fromPixel(coordinates as PointCoordinates, settings)
  }
}
