import { DIRECTION } from '../../../constants'
import { type PartCoordinates, type CubeCoordinates } from '../../../types'
import { isCube, isOffset, isPoint, isTuple, tupleToCube } from '../../../utils'
import { offsetToCube } from '../../Node/converters'
import { completeCubeHexagon } from '../../completeCubeHexagon'
import { type HexagonSettings } from '../../types'
import { type VertexHexagon } from '../VertexHexagon'
import { fromPixel } from './fromPixel'

export const toCube = (
  coordinates: PartCoordinates<VertexHexagon>,
  settings: HexagonSettings
): Required<CubeCoordinates> => {
  if (isCube(coordinates)) {
    return {
      ...completeCubeHexagon(coordinates),
      direction:
        coordinates.direction ??
        (settings.isPointy ? DIRECTION.N : DIRECTION.W),
    }
  } else if (isOffset(coordinates)) {
    return {
      ...offsetToCube(coordinates, settings),
      direction:
        coordinates.direction ??
        (settings.isPointy ? DIRECTION.N : DIRECTION.W),
    }
  } else if (isTuple(coordinates)) {
    return {
      ...completeCubeHexagon(tupleToCube(coordinates)),
      direction:
        coordinates[3] ?? (settings.isPointy ? DIRECTION.N : DIRECTION.W),
    }
  } else if (isPoint(coordinates)) {
    return fromPixel(coordinates, settings)
  }

  throw new TypeError(
    `Invalid Hexagon coordinates. Recieved:
        ${JSON.stringify(coordinates)}.`
  )
}
