import { type Traverser } from '../../../Grid'
import {
  type PointCoordinates,
  type PartCoordinates,
  type CubeCoordinates,
} from '../../../types'
import { isPoint } from '../../../utils'
import { type NodeSquare } from '..'
import { type SquareSettings } from '../../types'
import { radiansToVector } from '../../../utils/maths/radiansToVector'

// prettier-ignore
export function lineWalk(options: {start?: PartCoordinates<NodeSquare>, stop: PartCoordinates<NodeSquare>}): Traverser<NodeSquare>
// prettier-ignore
export function lineWalk(options: {start?: PartCoordinates<NodeSquare>, direction: number, length?: number}): Traverser<NodeSquare>
export function lineWalk(options: {
  start?: PartCoordinates<NodeSquare>
  stop?: PartCoordinates<NodeSquare>
  direction?: number
  length?: number
}): Traverser<NodeSquare> {
  const { start, direction, length = 1, stop } = options
  return (create, cursor): NodeSquare[] => {
    const first = start != null ? create(start) : cursor ?? create()
    const last = create(stop)
    const includeStart = start != null || cursor == null

    const point1 = isPoint(start) ? start : first.center
    const point2 = isPoint(stop) ? stop : last.center
    let results: Array<Omit<CubeCoordinates, 'direction'>> = []
    if (direction == null && stop != null) {
      results = lineWalkBetweenPoint(point1, point2, first, { includeStart })
    } else if (direction != null) {
      results = lineWalkVector(first, direction, length, {
        includeStart,
      })
    }

    return results.map((coord) => {
      return create(coord)
    })
  }
}

export const lineWalkVector = (
  start: Omit<CubeCoordinates, 'direction'>,
  direction: number,
  length: number,
  options?: { includeStart: boolean }
): Array<Omit<CubeCoordinates, 'direction'>> => {
  const results: Array<Omit<CubeCoordinates, 'direction'>> = []
  const { includeStart = true } = options ?? {}
  const vector = radiansToVector(direction)

  let q = start.q
  let r = start.r
  const stepq = vector.x > 0 ? 1 : -1
  const stepr = vector.y > 0 ? 1 : -1
  const nq = Math.abs(vector.x)
  const nr = Math.abs(vector.y)
  let iq = 1
  let ir = 1

  let count = 1
  if (includeStart) {
    results.push({ q, r, s: 0 })
  }

  while (count < length) {
    if (iq / nq <= ir / nr) {
      q += stepq
      iq += 1
    } else {
      r += stepr
      ir += 1
    }
    results.push({ q, r, s: 0 })
    count += 1
  }
  return results
}

export const lineWalkBetweenPoint = (
  start: Omit<PointCoordinates, 'direction'>,
  stop: Omit<PointCoordinates, 'direction'>,
  { size: { width, height }, origin }: SquareSettings,
  options?: { includeStart: boolean }
): Array<Omit<CubeCoordinates, 'direction'>> => {
  const { includeStart = true } = options ?? {}
  const results: Array<Omit<CubeCoordinates, 'direction'>> = []
  const x1 = (start.x - origin.x) / width
  const y1 = (start.y - origin.y) / height
  const x2 = (stop.x - origin.x) / width
  const y2 = (stop.y - origin.y) / height
  const dq = x2 - x1
  const dr = y2 - y1
  let q = Math.floor(x1)
  let r = Math.floor(y1)
  const stepq = dq > 0 ? 1 : -1
  const stepr = dr > 0 ? 1 : -1
  let tq = dq !== 0 ? (q + Number(dq >= 0) - x1) / dq : Infinity
  let tr = dr !== 0 ? (r + Number(dr >= 0) - y1) / dr : Infinity
  const idq = dq !== 0 ? Math.abs(1 / dq) : Infinity
  const idr = dr !== 0 ? Math.abs(1 / dr) : Infinity

  if (includeStart) {
    results.push({ q, r, s: 0 })
  }
  while (true) {
    if (tq <= tr) {
      if (tq > 1) return results
      q += stepq
      tq += idq
    } else {
      if (tr > 1) return results
      r += stepr
      tr += idr
    }
    results.push({ q, r, s: 0 })
  }
}
