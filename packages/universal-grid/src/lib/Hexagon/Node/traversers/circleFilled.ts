import { type Traverser } from '../../../Grid'
import { repeatWith } from '../../../Grid/traversers'
import { type CubeCoordinates, type PartCoordinates } from '../../../types'
import { type NodeHexagon } from '../NodeHexagon'
import { circleOutline } from './circleOutline'
import { lineWalk } from './lineWalk'

// prettier-ignore
export function circleFilled(options: { center?: PartCoordinates<NodeHexagon>, radius: number }): Traverser<NodeHexagon>
// prettier-ignore
export function circleFilled(options: { center?: PartCoordinates<NodeHexagon>, radius: number, spiral: boolean, startDirection?: number, clockwise?: boolean }): Traverser<NodeHexagon>
export function circleFilled(options: {
  center?: PartCoordinates<NodeHexagon>
  radius: number
  spiral?: boolean
  startDirection?: number
  clockwise?: boolean
}): Traverser<NodeHexagon> {
  const {
    center,
    radius,
    spiral = false,
    startDirection = 0,
    clockwise = true,
  } = options

  return (create, cursor, grid): NodeHexagon[] => {
    const includeStart = center != null || cursor == null
    const first = center != null ? create(center) : cursor ?? create()
    if (spiral) {
      const length = center == null && cursor != null ? radius : radius + 1
      return repeatWith(
        lineWalk({ start: center, direction: startDirection, length }),
        circleOutline({ center: first, clockwise })
      )(create, cursor)
    } else {
      let results: Array<Omit<CubeCoordinates, 'direction'>> = []
      results = circleFilledNormal(first, radius, { includeStart })
      return results.map((coord) => {
        return create(coord)
      })
    }
  }
}

export const circleFilledNormal = (
  center: Omit<CubeCoordinates, 'direction'>,
  radius: number,
  options?: { includeStart: boolean }
): Array<Omit<CubeCoordinates, 'direction'>> => {
  const { includeStart = true } = options ?? {}
  const results: Array<Omit<CubeCoordinates, 'direction'>> = []
  for (let i = -radius; i <= radius; i++) {
    for (
      let j = Math.max(-radius, -i - radius);
      j <= Math.min(radius, -i + radius);
      j++
    ) {
      if (!(!includeStart && i === 0 && j === 0)) {
        const q = center.q + i
        const s = center.s + j
        results.push({ q, r: -q - s, s })
      }
    }
  }
  return results
}
