import { type HexagonSettings } from '../..'
import { type Traverser } from '../../../Grid'
import { type CubeCoordinates, type PartCoordinates } from '../../../types'
import { isFiniteNumber } from '../../../utils'
import { type NodeHexagon } from '../NodeHexagon'
import { lineWalkVector } from './lineWalk'

// prettier-ignore
export function circleOutline(options: { start?: PartCoordinates<NodeHexagon>, center: PartCoordinates<NodeHexagon>, clockwise?: boolean }): Traverser<NodeHexagon>
// prettier-ignore
export function circleOutline(options: { center?: PartCoordinates<NodeHexagon>, radius: number, startDirection?: number, clockwise?: boolean }): Traverser<NodeHexagon>
export function circleOutline(options: {
  start?: PartCoordinates<NodeHexagon>
  center?: PartCoordinates<NodeHexagon>
  radius?: number
  startDirection?: number
  clockwise?: boolean
}): Traverser<NodeHexagon> {
  const {
    start,
    center,
    radius,
    startDirection = 0,
    clockwise = true,
  } = options
  return (create, cursor, grid): NodeHexagon[] => {
    let _radius = radius as number
    let _startDirection = startDirection
    let first = cursor as NodeHexagon
    let includeStart = true
    if (center != null && radius == null) {
      const centerNode = create(center)
      first = create(start ?? cursor)
      includeStart = start != null || cursor == null
      _radius = Math.max(
        Math.abs(first.q - centerNode.q),
        Math.abs(first.r - centerNode.r),
        Math.abs(first.s - centerNode.s)
      )
      _startDirection = Math.atan2(
        first.center.y - centerNode.center.y,
        first.center.x - centerNode.center.x
      )
    } else if (isFiniteNumber(radius)) {
      const centerNode = create(center ?? cursor)
      const line = lineWalkVector(
        centerNode,
        startDirection,
        radius,
        centerNode
      )
      first = create(line.at(-1))
    }
    const results = circleOutlineNormal(
      first,
      _radius,
      _startDirection,
      clockwise,
      first,
      { includeStart }
    )
    return results.map((coord) => {
      return create(coord)
    })
  }
}

export const circleOutlineNormal = (
  start: CubeCoordinates,
  radius: number,
  startDirection: number,
  clockwise = true,
  settings: HexagonSettings,
  options?: { includeStart: boolean }
): Array<Omit<CubeCoordinates, 'direction'>> => {
  const { includeStart = true } = options ?? {}
  const results: Array<Omit<CubeCoordinates, 'direction'>> = []

  results.push({ q: start.q, r: start.r, s: start.s })

  let direction =
    startDirection + (clockwise ? -Math.PI * (2 / 3) : Math.PI * (2 / 3))
  for (let i = 0; i < 6; i++) {
    const line = lineWalkVector(
      results.at(-1) as Omit<CubeCoordinates, 'direction'>,
      direction,
      radius + 1,
      settings,
      {
        includeStart: false,
      }
    )
    results.push(...line)
    direction += clockwise ? -Math.PI / 3 : Math.PI / 3
  }
  if (!includeStart) {
    results.shift()
  }
  return results
}
