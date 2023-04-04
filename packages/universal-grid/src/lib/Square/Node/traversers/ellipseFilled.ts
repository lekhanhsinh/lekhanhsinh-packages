import { type Traverser } from '../../../Grid'
import {
  type PartCoordinates,
  type CubeCoordinates,
  type Ellipse,
} from '../../../types'
import { type NodeSquare } from '../NodeSquare'

export function ellipseFilled(options: {
  center?: PartCoordinates<NodeSquare>
  radius: number | Ellipse
}): Traverser<NodeSquare> {
  const { center, radius } = options
  return (create, cursor): NodeSquare[] => {
    const first = center != null ? create(center) : cursor ?? create()
    const includeStart = center != null || cursor == null
    let _radius = radius as Ellipse
    if (Number.isFinite(radius)) {
      _radius = { xRadius: radius as number, yRadius: radius as number }
    }
    const results = ellipseFilledNormal(first, _radius, { includeStart })

    return results.map((coord) => {
      return create(coord)
    })
  }
}

export const ellipseFilledNormal = (
  center: Omit<CubeCoordinates, 'direction'>,
  { xRadius, yRadius }: Ellipse,
  options?: { includeStart: boolean }
): Array<Omit<CubeCoordinates, 'direction'>> => {
  const { includeStart = true } = options ?? {}

  const results: Array<Omit<CubeCoordinates, 'direction'>> = []
  const top = Math.ceil(center.r - yRadius)
  const bottom = Math.floor(center.r + yRadius)
  const left = Math.ceil(center.q - xRadius)
  const right = Math.floor(center.q + xRadius)

  for (let r = top; r <= bottom; r++) {
    for (let q = left; q <= right; q++) {
      if (
        !(!includeStart && q === center.q && r === center.r) &&
        isInsideEllipse(center, { q, r, s: 0 }, { xRadius, yRadius })
      ) {
        results.push({ q, r, s: 0 })
      }
    }
  }
  return results
}

export const isInsideEllipse = (
  center: Omit<CubeCoordinates, 'direction'>,
  tile: Omit<CubeCoordinates, 'direction'>,
  { xRadius, yRadius }: Ellipse
): boolean => {
  const dq = center.q - tile.q
  const dr = center.r - tile.r
  return Math.pow(dq / xRadius, 2) + Math.pow(dr / yRadius, 2) < 1
}
