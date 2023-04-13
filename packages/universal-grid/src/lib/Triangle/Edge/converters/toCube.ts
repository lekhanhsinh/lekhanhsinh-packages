import { isCube, isOffset, isPoint, isTuple, tupleToCube } from '../../../utils'
import { fromPixel } from './fromPixel'
import { type PartCoordinates, type CubeCoordinates } from '../../../types'
import { DIRECTION } from '../../../constants'
import { type EdgeTriangle } from '../EdgeTriangle'
import { type TriangleSettings } from '../../types'
import { offsetToCube } from '../../Node/converters'

export const toCube = (
  coordinates: PartCoordinates<EdgeTriangle>,
  settings: TriangleSettings
): Required<CubeCoordinates> => {
  if (isCube(coordinates)) {
    return {
      ...coordinates,
      direction: coordinates.direction ?? DIRECTION.N,
    }
  } else if (isOffset(coordinates)) {
    return {
      ...offsetToCube(coordinates, settings),
      direction: coordinates.direction ?? DIRECTION.N,
    }
  } else if (isTuple(coordinates)) {
    const { q, r, s } = tupleToCube(coordinates)
    return {
      q: q ?? 0,
      r: r ?? 0,
      s: s ?? 0,
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
