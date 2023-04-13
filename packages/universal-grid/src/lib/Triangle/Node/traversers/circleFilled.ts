import { type Traverser } from '../../../Grid'
import { type CubeCoordinates, type PartCoordinates } from '../../../types'
import { type NodeTriangle } from '../NodeTriangle'

// prettier-ignore
export function circleFilled(options: { center?: PartCoordinates<NodeTriangle>, radius: number }): Traverser<NodeTriangle>
export function circleFilled(options: {
  center?: PartCoordinates<NodeTriangle>
  radius: number
}): Traverser<NodeTriangle> {
  const { center, radius } = options

  return (create, cursor, grid): NodeTriangle[] => {
    const includeStart = center != null || cursor == null
    const first = center != null ? create(center) : cursor ?? create()
    let results: Array<Omit<CubeCoordinates, 'direction'>> = []
    results = circleFilledNormal(first, radius, { includeStart })
    return results.map((coord) => {
      return create(coord)
    })
  }
}

export const circleFilledNormal = (
  center: Omit<CubeCoordinates, 'direction'>,
  radius: number,
  options?: { includeStart: boolean }
): Array<Omit<CubeCoordinates, 'direction'>> => {
  const { includeStart = true } = options ?? {}
  const results: Array<Omit<CubeCoordinates, 'direction'>> = []
  for (let i = -radius; i < radius + 1; i++) {
    for (let j = -radius; j < radius + 1; j++) {
      const k = 1 - i - j - center.q - center.r - center.s
      if (
        !(!includeStart && i === 0 && j === 0 && k === 0) &&
        Math.abs(i) + Math.abs(j) + Math.abs(k) <= radius
      ) {
        results.push({ q: center.q + i, r: center.r + j, s: center.s + k })
      }
      if (
        !(!includeStart && i === 0 && j === 0 && k + 1 === 0) &&
        Math.abs(i) + Math.abs(j) + Math.abs(k + 1) <= radius
      ) {
        results.push({ q: center.q + i, r: center.r + j, s: center.s + k + 1 })
      }
    }
  }
  return results
}
