import { defaultHexagonSettings } from '..'
import { DIRECTION, PART_TYPE, SHAPE } from '../../constants'
import {
  type PointCoordinates,
  type CubeCoordinates,
  type PartCoordinates,
  type OffsetCoordinates,
} from '../../types'
import { isHexagon } from '../isHexagon'
import { type HexagonSettings } from '../types'
import { toCube, toPixel } from './converters'

export class EdgeHexagon
  implements
    Readonly<HexagonSettings>,
    Readonly<Required<CubeCoordinates>>,
    Readonly<OffsetCoordinates>
{
  static readonly type = PART_TYPE.EDGE
  static readonly shape = SHAPE.HEXAGON
  readonly type = PART_TYPE.EDGE
  readonly shape = SHAPE.HEXAGON

  static get settings(): HexagonSettings {
    return defaultHexagonSettings
  }

  get size(): HexagonSettings['size'] {
    return (this.constructor as typeof EdgeHexagon).settings.size
  }

  get origin(): HexagonSettings['origin'] {
    return (this.constructor as typeof EdgeHexagon).settings.origin
  }

  get inverse(): HexagonSettings['inverse'] {
    return (this.constructor as typeof EdgeHexagon).settings.inverse
  }

  get isPointy(): HexagonSettings['isPointy'] {
    return (this.constructor as typeof EdgeHexagon).settings.isPointy
  }

  get offset(): HexagonSettings['offset'] {
    return (this.constructor as typeof EdgeHexagon).settings.offset
  }

  get col(): number {
    return this.q
  }

  get row(): number {
    return this.r
  }

  get center(): PointCoordinates {
    return toPixel(this, this)
  }

  readonly #values: number[] = [0, 0, 0]

  get q(): number {
    return this.#values[0]
  }

  get r(): number {
    return this.#values[1]
  }

  get s(): number {
    return this.#values[2]
  }

  get direction(): DIRECTION {
    return this.#values[3]
  }

  constructor(coordinates: PartCoordinates<EdgeHexagon> = [0, 0, 0]) {
    const { q, r, s, direction } = toCube(coordinates, this)
    this.#values = [q, r, s, direction]
    if (!isHexagon({ q, r, s })) {
      throw new Error(
        `Invalid Hexagon cube coordinates.
          Received: ${JSON.stringify({ q, r, s })}`
      )
    }
    if (
      this.isPointy &&
      ![DIRECTION.NNE, DIRECTION.NNW, DIRECTION.W].includes(this.direction)
    ) {
      throw new Error(
        `Invalid pointy EdgeHexagon direction (DIRECTION.NNE | DIRECTION.NNW | DIRECTION.W).
          Received: ${this.direction}`
      )
    } else if (
      !this.isPointy &&
      ![DIRECTION.NEE, DIRECTION.NWW, DIRECTION.N].includes(this.direction)
    ) {
      throw new Error(
        `Invalid flat EdgeHexagon direction (DIRECTION.NEE | DIRECTION.NWW | DIRECTION.N).
          Received: ${this.direction}`
      )
    }
  }

  toString(): string {
    return JSON.stringify({
      q: this.q,
      r: this.r,
      s: this.s,
      direction: this.direction,
    })
  }

  continue(direction: DIRECTION): Required<CubeCoordinates> | undefined {
    const continueSteps = conitnueMap.get(this.direction)
    if (continueSteps == null) return
    const conti = continueSteps.get(direction)
    if (conti == null) return
    return {
      q: this.q + conti.q,
      r: this.r + conti.r,
      s: this.s + conti.s,
      direction: conti.direction,
    }
  }

  continues(): Map<DIRECTION, Required<CubeCoordinates>> {
    const results = new Map<DIRECTION, Required<CubeCoordinates>>()
    const continueSteps = conitnueMap.get(this.direction)
    if (continueSteps == null) return results
    continueSteps.forEach((value, key) => {
      if (value == null) return
      results.set(key, {
        q: this.q + value.q,
        r: this.r + value.r,
        s: this.s + value.s,
        direction: value.direction,
      })
    })
    return results
  }

  join(direction: DIRECTION): Omit<CubeCoordinates, 'direction'> | undefined {
    const joinSteps = joinMap.get(this.direction)
    if (joinSteps == null) return
    const join = joinSteps.get(direction)
    if (join == null) return
    return { q: this.q + join.q, r: this.r + join.r, s: this.s + join.s }
  }

  joins = (): Map<DIRECTION, Omit<CubeCoordinates, 'direction'>> => {
    const results = new Map<DIRECTION, Omit<CubeCoordinates, 'direction'>>()
    const joinSteps = joinMap.get(this.direction)
    if (joinSteps == null) return results
    joinSteps.forEach((value, key) => {
      if (value == null) return
      results.set(key, {
        q: this.q + value.q,
        r: this.r + value.r,
        s: this.s + value.s,
      })
    })
    return results
  }

  endpoint(direction: DIRECTION): Required<CubeCoordinates> | undefined {
    const endpointSteps = endpointMap.get(this.direction)
    if (endpointSteps == null) return
    const endpoint = endpointSteps.get(direction)
    if (endpoint == null) return
    return {
      q: this.q + endpoint.q,
      r: this.r + endpoint.r,
      s: this.s + endpoint.s,
      direction: endpoint.direction,
    }
  }

  endpoints = (): Map<DIRECTION, Required<CubeCoordinates>> => {
    const results = new Map<DIRECTION, Required<CubeCoordinates>>()
    const endpointSteps = endpointMap.get(this.direction)
    if (endpointSteps == null) return results
    endpointSteps.forEach((value, key) => {
      if (value == null) return
      results.set(key, {
        q: this.q + value.q,
        r: this.r + value.r,
        s: this.s + value.s,
        direction: value.direction,
      })
    })
    return results
  }
}

export const continuePointyWSteps = new Map<
  DIRECTION,
  Required<CubeCoordinates>
>([
  [DIRECTION.NWW, { q: -1, r: 1, s: 0, direction: DIRECTION.NNE }],
  [DIRECTION.NEE, { q: 0, r: 0, s: 0, direction: DIRECTION.NNW }],
  [DIRECTION.SEE, { q: -1, r: 0, s: 1, direction: DIRECTION.NNE }],
  [DIRECTION.SWW, { q: -1, r: 0, s: 1, direction: DIRECTION.NNW }],
])

export const continuePointyNNWSteps = new Map<
  DIRECTION,
  Required<CubeCoordinates>
>([
  [DIRECTION.N, { q: 1, r: 0, s: -1, direction: DIRECTION.W }],
  [DIRECTION.SEE, { q: 0, r: 0, s: 0, direction: DIRECTION.NNE }],
  [DIRECTION.S, { q: 0, r: 0, s: 0, direction: DIRECTION.W }],
  [DIRECTION.NWW, { q: -1, r: 1, s: 0, direction: DIRECTION.NNE }],
])

export const continuePointyNNESteps = new Map<
  DIRECTION,
  Required<CubeCoordinates>
>([
  [DIRECTION.N, { q: 1, r: 0, s: -1, direction: DIRECTION.W }],
  [DIRECTION.NEE, { q: 1, r: -1, s: 0, direction: DIRECTION.NNW }],
  [DIRECTION.S, { q: 1, r: -1, s: 0, direction: DIRECTION.W }],
  [DIRECTION.SWW, { q: 0, r: 0, s: 0, direction: DIRECTION.NNW }],
])

export const continueFlatNSteps = new Map<DIRECTION, Required<CubeCoordinates>>(
  [
    [DIRECTION.NNW, { q: -1, r: 1, s: 0, direction: DIRECTION.NEE }],
    [DIRECTION.NNE, { q: 1, r: 0, s: -1, direction: DIRECTION.NWW }],
    [DIRECTION.SSE, { q: 0, r: 0, s: 0, direction: DIRECTION.NEE }],
    [DIRECTION.SSW, { q: 0, r: 0, s: 0, direction: DIRECTION.NWW }],
  ]
)

export const continueFlatNWWSteps = new Map<
  DIRECTION,
  Required<CubeCoordinates>
>([
  [DIRECTION.NNW, { q: -1, r: 1, s: 0, direction: DIRECTION.NEE }],
  [DIRECTION.E, { q: 0, r: 0, s: 0, direction: DIRECTION.N }],
  [DIRECTION.SSE, { q: -1, r: 0, s: 1, direction: DIRECTION.NEE }],
  [DIRECTION.W, { q: -1, r: 0, s: 1, direction: DIRECTION.N }],
])

export const continueFlatNEESteps = new Map<
  DIRECTION,
  Required<CubeCoordinates>
>([
  [DIRECTION.NNE, { q: 1, r: 0, s: -1, direction: DIRECTION.NWW }],
  [DIRECTION.E, { q: 1, r: -1, s: 0, direction: DIRECTION.N }],
  [DIRECTION.SSW, { q: 1, r: -1, s: 0, direction: DIRECTION.NWW }],
  [DIRECTION.W, { q: 0, r: 0, s: 0, direction: DIRECTION.N }],
])

export const conitnueMap = new Map<
  DIRECTION,
  Map<DIRECTION, Required<CubeCoordinates>>
>([
  [DIRECTION.W, continuePointyWSteps],
  [DIRECTION.NWW, continueFlatNWWSteps],
  [DIRECTION.NEE, continueFlatNEESteps],
  [DIRECTION.N, continueFlatNSteps],
  [DIRECTION.NNE, continuePointyNNESteps],
  [DIRECTION.NNW, continuePointyNNWSteps],
])

export const joinPointyNNESteps = new Map<
  DIRECTION,
  Omit<CubeCoordinates, 'direction'>
>([
  [DIRECTION.NNE, { q: 1, r: 0, s: -1 }],
  [DIRECTION.SSW, { q: 0, r: 0, s: 0 }],
])

export const joinPointyNNWSteps = new Map<
  DIRECTION,
  Omit<CubeCoordinates, 'direction'>
>([
  [DIRECTION.NNW, { q: 0, r: 1, s: -1 }],
  [DIRECTION.SSE, { q: 0, r: 0, s: 0 }],
])

export const joinPointyWSteps = new Map<
  DIRECTION,
  Omit<CubeCoordinates, 'direction'>
>([
  [DIRECTION.W, { q: -1, r: 1, s: 0 }],
  [DIRECTION.E, { q: 0, r: 0, s: 0 }],
])

export const joinFlatNEESteps = new Map<
  DIRECTION,
  Omit<CubeCoordinates, 'direction'>
>([
  [DIRECTION.NEE, { q: 1, r: 0, s: -1 }],
  [DIRECTION.SSW, { q: 0, r: 0, s: 0 }],
])

export const joinFlatNWWSteps = new Map<
  DIRECTION,
  Omit<CubeCoordinates, 'direction'>
>([
  [DIRECTION.NNW, { q: -1, r: 1, s: 0 }],
  [DIRECTION.SSE, { q: 0, r: 0, s: 0 }],
])

export const joinFlatNSteps = new Map<
  DIRECTION,
  Omit<CubeCoordinates, 'direction'>
>([
  [DIRECTION.W, { q: 0, r: 1, s: -1 }],
  [DIRECTION.E, { q: 0, r: 0, s: 0 }],
])

export const joinMap = new Map<
  DIRECTION,
  Map<DIRECTION, Omit<CubeCoordinates, 'direction'>>
>([
  [DIRECTION.W, joinPointyWSteps],
  [DIRECTION.NWW, joinFlatNWWSteps],
  [DIRECTION.NEE, joinFlatNEESteps],
  [DIRECTION.N, joinFlatNSteps],
  [DIRECTION.NNE, joinPointyNNESteps],
  [DIRECTION.NNW, joinPointyNNWSteps],
])

export const endpointPointyNNESteps = new Map<
  DIRECTION,
  Required<CubeCoordinates>
>([
  [DIRECTION.NWW, { q: 0, r: 0, s: 0, direction: DIRECTION.N }],
  [DIRECTION.SEE, { q: 1, r: 0, s: -1, direction: DIRECTION.S }],
])

export const endpointPointyNNWSteps = new Map<
  DIRECTION,
  Required<CubeCoordinates>
>([
  [DIRECTION.NEE, { q: 0, r: 0, s: 0, direction: DIRECTION.N }],
  [DIRECTION.SWW, { q: 0, r: 1, s: -1, direction: DIRECTION.S }],
])

export const endpointPointyWSteps = new Map<
  DIRECTION,
  Required<CubeCoordinates>
>([
  [DIRECTION.N, { q: 0, r: 1, s: -1, direction: DIRECTION.S }],
  [DIRECTION.S, { q: -1, r: 0, s: 1, direction: DIRECTION.N }],
])

export const endpointFlatNEESteps = new Map<
  DIRECTION,
  Required<CubeCoordinates>
>([
  [DIRECTION.NNW, { q: 1, r: 0, s: -1, direction: DIRECTION.W }],
  [DIRECTION.SSE, { q: 0, r: 0, s: 0, direction: DIRECTION.E }],
])

export const endpointPointyNWWSteps = new Map<
  DIRECTION,
  Required<CubeCoordinates>
>([
  [DIRECTION.NNE, { q: -1, r: 1, s: 0, direction: DIRECTION.E }],
  [DIRECTION.SSW, { q: 0, r: 0, s: 0, direction: DIRECTION.W }],
])

export const endpointPointyNSteps = new Map<
  DIRECTION,
  Required<CubeCoordinates>
>([
  [DIRECTION.W, { q: -1, r: 1, s: 0, direction: DIRECTION.E }],
  [DIRECTION.E, { q: 1, r: 0, s: -1, direction: DIRECTION.W }],
])

export const endpointMap = new Map<
  DIRECTION,
  Map<DIRECTION, Required<CubeCoordinates>>
>([
  [DIRECTION.W, endpointPointyWSteps],
  [DIRECTION.NWW, endpointPointyNWWSteps],
  [DIRECTION.NEE, endpointFlatNEESteps],
  [DIRECTION.N, endpointPointyNSteps],
  [DIRECTION.NNE, endpointPointyNNESteps],
  [DIRECTION.NNW, endpointPointyNNWSteps],
])
