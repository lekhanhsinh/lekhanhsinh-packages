import { type TriangleSettings } from '../..'
import { type Traverser } from '../../../Grid'
import {
  type CubeCoordinates,
  type BoundingBox,
  type Ellipse,
  type PartCoordinates,
} from '../../../types'
import { isFiniteNumber } from '../../../utils'
import { type NodeTriangle } from '../NodeTriangle'
import { cubeToOffset, offsetToCube } from '../converters'

// prettier-ignore
export function rectangleFilled(options: { center?: PartCoordinates<NodeTriangle>, radius: number | Ellipse }): Traverser<NodeTriangle>
export function rectangleFilled(options: {
  start?: PartCoordinates<NodeTriangle>
  center?: PartCoordinates<NodeTriangle>
  size?: BoundingBox
  direction?: number
  radius?: number | Ellipse
}): Traverser<NodeTriangle> {
  const { center, radius } = options

  return (create, cursor, grid): NodeTriangle[] => {
    if (radius != null) {
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
  settings: TriangleSettings,
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
