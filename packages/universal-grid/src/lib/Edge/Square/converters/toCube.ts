import { type SquareSettings } from '../../../Node'
import { isCube, isOffset, isTuple, tupleToCube } from '../../../utils'
import { fromPixel } from './fromPixel'
import { type EdgeClass } from '../../types'
import {
  type PointCoordinates,
  type PartCoordinates,
  type EdgeCoordinates,
  type CubeCoordinates,
} from '../../../types'
import { DIRECTION } from '../../../constants'

export const toCube = (
  coordinates: PartCoordinates<EdgeClass>,
  settings: SquareSettings
): EdgeCoordinates => {
  let _direction = (coordinates as { direction?: number }).direction
  let _coordinates: CubeCoordinates & { direction?: number }
  if (isCube(coordinates)) {
    _coordinates = coordinates
  } else if (isOffset(coordinates)) {
    _coordinates = {
      q: coordinates.col,
      r: coordinates.row,
      s: 0,
    }
  } else if (isTuple(coordinates)) {
    _direction = (coordinates as number[])[3]
    _coordinates = tupleToCube(coordinates)
  } else {
    _coordinates = fromPixel(coordinates as PointCoordinates, settings)
  }
  return {
    ..._coordinates,
    direction: _direction ?? _coordinates.direction ?? DIRECTION.N,
  }
}
