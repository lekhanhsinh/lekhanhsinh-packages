import { isPointUp, roundCubeTriangle, type TriangleSettings } from '../..'
import { type Traverser } from '../../../Grid'
import {
  type PartCoordinates,
  type CubeCoordinates,
  type PointCoordinates,
} from '../../../types'
import { isPoint, radiansToVector } from '../../../utils'
import { type NodeTriangle } from '../NodeTriangle'

// prettier-ignore
export function lineWalk(options: {start?: PartCoordinates<NodeTriangle>, stop: PartCoordinates<NodeTriangle>}): Traverser<NodeTriangle>
// prettier-ignore
export function lineWalk(options: {start?: PartCoordinates<NodeTriangle>, direction: number, length?: number}): Traverser<NodeTriangle>
export function lineWalk(options: {
  start?: PartCoordinates<NodeTriangle>
  stop?: PartCoordinates<NodeTriangle>
  direction?: number
  length?: number
}): Traverser<NodeTriangle> {
  const { start, direction, length = 1, stop } = options
  return (create, cursor): NodeTriangle[] => {
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
  let s = start.s
  const sq = vector.x - (1 / 2) * vector.y
  const sr = vector.y
  const ss = -vector.x - (1 / 2) * vector.y
  const stepq = sq > 0 ? 1 : -1
  const stepr = sr > 0 ? 1 : -1
  const steps = ss > 0 ? 1 : -1
  const nq = Math.abs(sq)
  const nr = Math.abs(sr)
  const ns = Math.abs(ss)
  let iq = 1
  let ir = 1
  let is = 1

  let count = 1
  if (includeStart) {
    results.push({ q, r, s })
  }

  let pointUp = isPointUp({ q, r, s })

  while (count < length) {
    if (iq / nq <= ir / nr && iq / nq <= is / ns && (stepq === 1) !== pointUp) {
      q += stepq
      iq += 1
    } else if (ir / nr <= iq / nq && (stepr === 1) !== pointUp) {
      r += stepr
      ir += 1
    } else if (
      is / ns <= iq / nq &&
      is / ns <= ir / nr &&
      (steps === 1) !== pointUp
    ) {
      s += steps
      is += 1
    } else {
      if ((stepq === 1) !== pointUp) {
        q += stepq
        iq += 1
      } else if ((stepr === 1) !== pointUp) {
        r += stepr
        ir += 1
      } else {
        s += steps
        is += 1
      }
    }
    results.push({ q, r, s })
    count += 1
    pointUp = !pointUp
  }

  return results
}

export const lineWalkBetweenPoint = (
  start: Omit<PointCoordinates, 'direction'>,
  stop: Omit<PointCoordinates, 'direction'>,
  { size: { width, height }, origin, inverse }: TriangleSettings,
  options?: { includeStart: boolean }
): Array<Omit<CubeCoordinates, 'direction'>> => {
  const { includeStart = true } = options ?? {}
  const _start = {
    x: inverse.x ? -(start.x - origin.x) : start.x - origin.x,
    y: inverse.y ? -(start.y - origin.y) : start.y - origin.y,
  }
  const _stop = {
    x: inverse.x ? -(stop.x - origin.x) : stop.x - origin.x,
    y: inverse.y ? -(stop.y - origin.y) : stop.y - origin.y,
  }
  const results: Array<Omit<CubeCoordinates, 'direction'>> = []

  const dx = _stop.x - _start.x
  const dy = _stop.y - _start.y
  const fq = _start.x / width - ((1 / 2) * _start.y) / height
  const fr = _start.y / height
  const fs = -_start.x / width - ((1 / 2) * _start.y) / height
  const dq = dx / width - ((1 / 2) * dy) / height
  const dr = dy / height
  const ds = -dx / width - ((1 / 2) * dy) / height

  let { q, r, s } = roundCubeTriangle({ q: fq, r: fr, s: fs })
  let pointUp = isPointUp({ q, r, s })
  const stepq = dq > 0 ? 1 : -1
  const stepr = dr > 0 ? 1 : -1
  const steps = ds > 0 ? 1 : -1
  let tq = dq !== 0 ? (q - Number(dq <= 0) - fq) / dq : Infinity
  let tr = dr !== 0 ? (r - Number(dr <= 0) - fr) / dr : Infinity
  let ts = ds !== 0 ? (s - Number(ds <= 0) - fs) / ds : Infinity
  const idq = dq !== 0 ? Math.abs(1 / dq) : Infinity
  const idr = dr !== 0 ? Math.abs(1 / dr) : Infinity
  const ids = ds !== 0 ? Math.abs(1 / ds) : Infinity
  if (includeStart) {
    results.push({ q, r, s })
  }
  while (true) {
    if (tq <= tr && tq <= ts && (stepq === 1) !== pointUp) {
      if (tq > 1) return results
      q += stepq
      tq += idq
    } else if (tr <= tq && tr <= ts && (stepr === 1) !== pointUp) {
      if (tr > 1) return results
      r += stepr
      tr += idr
    } else {
      if (ts > 1) return results
      s += steps
      ts += ids
    }
    results.push({ q, r, s })
    pointUp = !pointUp
  }
}
