import { isCube, isOffset, isPoint, isTuple, tupleToCube } from '../../../utils'
import { fromPixel } from './fromPixel'
import { type PartCoordinates, type CubeCoordinates } from '../../../types'
import { DIRECTION } from '../../../constants'
import { type EdgeSquare } from '../EdgeSquare'
import { type SquareSettings } from '../../types'

export const toCube = (
  coordinates: PartCoordinates<EdgeSquare>,
  settings: SquareSettings
): Required<CubeCoordinates> => {
  if (isCube(coordinates)) {
    return {
      ...coordinates,
      direction: coordinates.direction ?? DIRECTION.N,
    }
  } else if (isOffset(coordinates)) {
    return {
      q: coordinates.col,
      r: coordinates.row,
      s: 0,
      direction: coordinates.direction ?? DIRECTION.N,
    }
  } else if (isTuple(coordinates)) {
    return {
      ...tupleToCube(coordinates),
      direction: coordinates[3] ?? DIRECTION.N,
    }
  } else if (isPoint(coordinates)) {
    return fromPixel(coordinates, settings)
  }

  throw new TypeError(
    `Invalid coordinates. Recieved:
          ${JSON.stringify(coordinates)}.`
  )
}
