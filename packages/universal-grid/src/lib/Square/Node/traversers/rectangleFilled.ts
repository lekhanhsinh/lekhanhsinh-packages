import { type Traverser } from '../../../Grid'
import { repeatWith } from '../../../Grid/traversers'
import {
  type PartCoordinates,
  type BoundingBox,
  type Ellipse,
  type CubeCoordinates,
} from '../../../types'
import { isNumber } from '../../../utils/checkers/isNumber'
import { radiansToVector } from '../../../utils/maths/radiansToVector'
import { type NodeSquare } from '../NodeSquare'
import { lineWalk, lineWalkVector } from './lineWalk'

// prettier-ignore
export function rectangleFilled(options: { center?: PartCoordinates<NodeSquare>, radius: number | Ellipse }): Traverser<NodeSquare>
// prettier-ignore
export function rectangleFilled(options: { start?: PartCoordinates<NodeSquare>, direction: number, size: BoundingBox }): Traverser<NodeSquare>
// prettier-ignore
export function rectangleFilled(options: { start?: PartCoordinates<NodeSquare>, radius: number | Ellipse, spiral: boolean, startDirection?: number }): Traverser<NodeSquare>
export function rectangleFilled(options: {
  start?: PartCoordinates<NodeSquare>
  center?: PartCoordinates<NodeSquare>
  size?: BoundingBox
  direction?: number
  radius?: number | Ellipse
  spiral?: boolean
  startDirection?: number
}): Traverser<NodeSquare> {
  const {
    start,
    center,
    size,
    direction,
    radius,
    spiral = false,
    startDirection,
  } = options

  return (create, cursor, grid): NodeSquare[] => {
    if (direction != null && size != null) {
      const first = start != null ? create(start) : cursor ?? create()
      const includeStart = start != null || cursor == null
      const results = repeatWith<NodeSquare>(
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
      if (isNumber(radius)) {
        _radius = { xRadius: radius, yRadius: radius }
      }
      if (spiral) {
        results = rectangleFilledSpiral(first, _radius, startDirection, {
          includeStart,
        })
      } else {
        results = rectangleFilledNormal(first, _radius, {
          includeStart,
        })
      }
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
  options?: { includeStart: boolean }
): Array<Omit<CubeCoordinates, 'direction'>> => {
  const { includeStart = true } = options ?? {}
  const results: Array<Omit<CubeCoordinates, 'direction'>> = []
  for (let i = -xRadius; i < xRadius; i++) {
    for (let j = -yRadius; j < yRadius; j++) {
      if (!(!includeStart && i === 0 && j === 0)) {
        results.push({ q: center.q + i, r: center.r + j, s: 0 })
      }
    }
  }
  return results
}

export const rectangleFilledSpiral = (
  center: Omit<CubeCoordinates, 'direction'>,
  { xRadius, yRadius }: Ellipse,
  startDirection = 0,
  options?: { includeStart: boolean }
): Array<Omit<CubeCoordinates, 'direction'>> => {
  const { includeStart = true } = options ?? {}
  const results: Array<Omit<CubeCoordinates, 'direction'>> = []
  let round = 0
  results.push({ q: center.q, r: center.r, s: 0 })

  let direction = startDirection
  while (round < Math.min(xRadius, yRadius) * 2) {
    for (let i = 0; i < 2; i++) {
      let d = 0
      const vector = radiansToVector(direction)
      if (Math.abs(vector.x) > Math.abs(vector.y) && xRadius > yRadius) {
        d = xRadius - yRadius
      } else if (Math.abs(vector.x) < Math.abs(vector.y) && xRadius < yRadius) {
        d = yRadius - xRadius
      }
      const line = lineWalkVector(
        results.at(-1) as Omit<CubeCoordinates, 'direction'>,
        direction,
        round + 2 + d * 2,
        {
          includeStart: false,
        }
      )
      results.push(...line)
      direction += Math.PI / 2
    }
    round += 1
  }
  if (!includeStart) {
    results.shift()
  }
  results.pop()
  return results
}
