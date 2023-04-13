import { roundCubeHexagon, type HexagonSettings } from '../..'
import { type Traverser } from '../../../Grid'
import { SQRT3_3 } from '../../../constants'
import {
  type PartCoordinates,
  type CubeCoordinates,
  type PointCoordinates,
} from '../../../types'
import { isPoint, radiansToVector } from '../../../utils'
import { type NodeHexagon } from '../NodeHexagon'

// prettier-ignore
export function lineWalk(options: {start?: PartCoordinates<NodeHexagon>, stop: PartCoordinates<NodeHexagon>}): Traverser<NodeHexagon>
// prettier-ignore
export function lineWalk(options: {start?: PartCoordinates<NodeHexagon>, direction: number, length?: number}): Traverser<NodeHexagon>
export function lineWalk(options: {
  start?: PartCoordinates<NodeHexagon>
  stop?: PartCoordinates<NodeHexagon>
  direction?: number
  length?: number
}): Traverser<NodeHexagon> {
  const { start, direction, length = 1, stop } = options
  return (create, cursor): NodeHexagon[] => {
    const first = start != null ? create(start) : cursor ?? create()
    const last = create(stop)
    const includeStart = start != null || cursor == null

    const point1 = isPoint(start) ? start : first.center
    const point2 = isPoint(stop) ? stop : last.center
    let results: Array<Omit<CubeCoordinates, 'direction'>> = []
    if (direction == null && stop != null) {
      results = lineWalkBetweenPoint(point1, point2, first, { includeStart })
    } else if (direction != null) {
      results = lineWalkVector(first, direction, length, first, {
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
  { isPointy }: HexagonSettings,
  options?: { includeStart: boolean }
): Array<Omit<CubeCoordinates, 'direction'>> => {
  const results: Array<Omit<CubeCoordinates, 'direction'>> = []
  const { includeStart = true } = options ?? {}
  const vector = radiansToVector(direction)

  let q = start.q
  let r = start.r
  let s = start.s
  let sq = 0
  let sr = 0
  let ss = 0
  if (isPointy) {
    sq = SQRT3_3 * vector.x - (1 / 3) * -vector.y
    ss = (2 / 3) * -vector.y
    sr = -sq - ss
  } else {
    sq = (2 / 3) * vector.x
    ss = SQRT3_3 * -vector.y - (1 / 3) * vector.x
    sr = -sq - ss
  }
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

  while (count < length) {
    let j = 0
    while (j < 2) {
      if (iq / nq <= ir / nr && iq / nq <= is / ns) {
        q += stepq
        iq += 1
        j += 1
      } else if (ir / nr <= iq / nq && ir / nr <= is / ns) {
        r += stepr
        ir += 1
        j += 1
      } else if (is / ns <= iq / nq && is / ns <= ir / nr) {
        s += steps
        is += 1
        j += 1
      }
    }
    results.push({ q, r, s })
    count += 1
  }

  return results
}

export const lineWalkBetweenPoint = (
  start: Omit<PointCoordinates, 'direction'>,
  stop: Omit<PointCoordinates, 'direction'>,
  { size: { width, height }, origin, isPointy, inverse }: HexagonSettings,
  options?: { includeStart: boolean }
): Array<Omit<CubeCoordinates, 'direction'>> => {
  const { includeStart = true } = options ?? {}
  const _start = {
    x: inverse.x ? -(start.x - origin.x) : start.x - origin.x,
    y: inverse.y ? start.y + origin.y : -(start.y + origin.y),
  }
  const _stop = {
    x: inverse.x ? -(stop.x - origin.x) : stop.x - origin.x,
    y: inverse.y ? stop.y + origin.y : -(stop.y + origin.y),
  }
  const results: Array<Omit<CubeCoordinates, 'direction'>> = []

  const dx = _stop.x - _start.x
  const dy = _stop.y - _start.y
  let fq = 0
  let fr = 0
  let fs = 0
  let dq = 0
  let ds = 0
  if (isPointy) {
    fq = ((SQRT3_3 * _start.x) / (width / 2) - (1 / 3) * _start.y) / (width / 2)
    fs = ((2 / 3) * _start.y) / (height / 2)
    fr = -fq - fs
    dq = (SQRT3_3 * dx) / (width / 2) - ((1 / 3) * dy) / (height / 2)
    ds = ((2 / 3) * dy) / (height / 2)
  } else {
    fq = ((2 / 3) * _start.x) / (width / 2)
    fs =
      (SQRT3_3 * _start.y) / (height / 2) - ((1 / 3) * _start.x) / (width / 2)
    fr = -fq - fs
    dq = ((2 / 3) * dx) / (width / 2)
    ds = (SQRT3_3 * dy) / (height / 2) - ((1 / 3) * dx) / (width / 2)
  }

  let { q, r, s } = roundCubeHexagon({ q: fq, r: fr, s: fs })
  const stepq = dq > 0 ? 1 : -1
  const steps = ds > 0 ? 1 : -1
  let tq = dq !== 0 ? (q + Number(dq >= 0) - fq) / dq : Infinity
  let ts = ds !== 0 ? (s + Number(ds >= 0) - fs) / ds : Infinity
  const idq = dq !== 0 ? Math.abs(1 / dq) : Infinity
  const ids = ds !== 0 ? Math.abs(1 / ds) : Infinity
  if (includeStart) {
    results.push({ q, r, s })
  }
  while (true) {
    if (tq <= ts) {
      if (tq > 1) return results
      q += stepq
      tq += idq
    } else {
      if (ts > 1) return results
      s += steps
      ts += ids
    }
    results.push({ q, r: -q - s, s })
  }
}
