import { isCube, isOffset, isPoint, isTuple, tupleToCube } from '../../../utils'
import { fromPixel } from './fromPixel'
import { type PartCoordinates, type CubeCoordinates } from '../../../types'
import { DIRECTION } from '../../../constants'
import { type EdgeHexagon } from '../EdgeHexagon'
import { type HexagonSettings } from '../../types'
import { offsetToCube } from '../../Node/converters'
import { completeCubeHexagon } from '../../completeCubeHexagon'

export const toCube = (
  coordinates: PartCoordinates<EdgeHexagon>,
  settings: HexagonSettings
): Required<CubeCoordinates> => {
  if (isCube(coordinates)) {
    return {
      ...completeCubeHexagon(coordinates),
      direction:
        coordinates.direction ??
        (settings.isPointy ? DIRECTION.W : DIRECTION.N),
    }
  } else if (isOffset(coordinates)) {
    return {
      ...offsetToCube(coordinates, settings),
      direction:
        coordinates.direction ??
        (settings.isPointy ? DIRECTION.W : DIRECTION.N),
    }
  } else if (isTuple(coordinates)) {
    return {
      ...completeCubeHexagon(tupleToCube(coordinates)),
      direction:
        coordinates[3] ?? (settings.isPointy ? DIRECTION.W : DIRECTION.N),
    }
  } else if (isPoint(coordinates)) {
    return fromPixel(coordinates, settings)
  }

  throw new TypeError(
    `Invalid Hexagon coordinates. Recieved:
        ${JSON.stringify(coordinates)}.`
  )
}
