import { completeCubeHexagon, type NodeHexagon } from '../../../Hexagon'
import { type HexagonSettings } from '../../../Hexagon/types'
import { type PartCoordinates, type CubeCoordinates } from '../../../types'
import { isCube, isOffset, isPoint, isTuple, tupleToCube } from '../../../utils'
import { fromPixel } from './fromPixel'
import { offsetToCube } from './offsetToCube'

export const toCube = (
  coordinates: PartCoordinates<NodeHexagon>,
  settings: HexagonSettings
): Omit<CubeCoordinates, 'direction'> => {
  if (isCube(coordinates)) {
    return completeCubeHexagon(coordinates)
  } else if (isOffset(coordinates)) {
    return offsetToCube(coordinates, settings)
  } else if (isTuple(coordinates)) {
    return completeCubeHexagon(tupleToCube(coordinates))
  } else if (isPoint(coordinates)) {
    return fromPixel(coordinates, settings)
  }
  throw new TypeError(
    `Invalid Hexagon coordinates. Recieved:
        ${JSON.stringify(coordinates)}.`
  )
}
