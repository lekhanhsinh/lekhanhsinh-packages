import { type HexagonSettings } from '../..'
import { type Traverser } from '../../../Grid'
import { repeatWith } from '../../../Grid/traversers'
import {
  type CubeCoordinates,
  type BoundingBox,
  type Ellipse,
  type PartCoordinates,
} from '../../../types'
import { isFiniteNumber } from '../../../utils'
import { type NodeHexagon } from '../NodeHexagon'
import { cubeToOffset, offsetToCube } from '../converters'
import { lineWalk } from './lineWalk'

// prettier-ignore
export function rectangleFilled(options: { center?: PartCoordinates<NodeHexagon>, radius: number | Ellipse }): Traverser<NodeHexagon>
// prettier-ignore
export function rectangleFilled(options: { start?: PartCoordinates<NodeHexagon>, direction: number, size: BoundingBox }): Traverser<NodeHexagon>
export function rectangleFilled(options: {
  start?: PartCoordinates<NodeHexagon>
  center?: PartCoordinates<NodeHexagon>
  size?: BoundingBox
  direction?: number
  radius?: number | Ellipse
}): Traverser<NodeHexagon> {
  const { start, center, size, direction, radius } = options

  return (create, cursor, grid): NodeHexagon[] => {
    if (direction != null && size != null) {
      const first = start != null ? create(start) : cursor ?? create()
      const includeStart = start != null || cursor == null
      const results = repeatWith<NodeHexagon>(
        lineWalk({
          start: first,
          direction: direction + Math.PI / 2,
          length: size.height,
        }),
        lineWalk({ direction, length: size.width })
      )(create, first, grid)
      if (!includeStart) {
        results.shift()
      }
      return results
    } else if (radius != null) {
      let results: Array<Omit<CubeCoordinates, 'direction'>> = []
      const includeStart = center != null || cursor == null
      const first = center != null ? create(center) : cursor ?? create()
      let _radius = radius as Ellipse
      if (isFiniteNumber(radius)) {
        _radius = { xRadius: radius, yRadius: radius }
      }

      results = rectangleFilledNormal(first, _radius, first, { includeStart })
      return results.map((coord) => {
        return create(coord)
      })
    }
    return []
  }
}

export const rectangleFilledNormal = (
  center: Omit<CubeCoordinates, 'direction'>,
  { xRadius, yRadius }: Ellipse,
  settings: HexagonSettings,
  options?: { includeStart: boolean }
): Array<Omit<CubeCoordinates, 'direction'>> => {
  const { includeStart = true } = options ?? {}
  const results: Array<Omit<CubeCoordinates, 'direction'>> = []
  const offset = cubeToOffset(center, settings)
  for (let i = -xRadius; i < xRadius; i++) {
    for (let j = -yRadius; j < yRadius; j++) {
      if (!(!includeStart && i === 0 && j === 0)) {
        const coord = offsetToCube(
          { col: offset.col + i, row: offset.row + j },
          settings
        )
        results.push(coord)
      }
    }
  }
  return results
}
