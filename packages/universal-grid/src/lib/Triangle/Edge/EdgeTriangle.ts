import { defaultTriangleSettings, isPointUp, isTriangle } from '..'
import { DIRECTION, PART_TYPE, SHAPE } from '../../constants'
import {
  type PointCoordinates,
  type CubeCoordinates,
  type PartCoordinates,
  type OffsetCoordinates,
} from '../../types'
import { cubeToString } from '../../utils'
import { cubeToOffset } from '../Node/converters'
import { type TriangleSettings } from '../types'
import { toCube, toPixel } from './converters'

export class EdgeTriangle
  implements
    Readonly<TriangleSettings>,
    Readonly<Required<CubeCoordinates>>,
    Readonly<OffsetCoordinates>
{
  static readonly type = PART_TYPE.EDGE
  static readonly shape = SHAPE.TRIANGLE
  readonly type = PART_TYPE.EDGE
  readonly shape = SHAPE.TRIANGLE

  static get settings(): TriangleSettings {
    return defaultTriangleSettings
  }

  get size(): TriangleSettings['size'] {
    return (this.constructor as typeof EdgeTriangle).settings.size
  }

  get origin(): TriangleSettings['origin'] {
    return (this.constructor as typeof EdgeTriangle).settings.origin
  }

  get inverse(): TriangleSettings['inverse'] {
    return (this.constructor as typeof EdgeTriangle).settings.inverse
  }

  get offset(): TriangleSettings['offset'] {
    return (this.constructor as typeof EdgeTriangle).settings.offset
  }

  get col(): number {
    return cubeToOffset(this, this).col
  }

  get row(): number {
    return cubeToOffset(this, this).row
  }

  get center(): PointCoordinates {
    return toPixel(this, this)
  }

  readonly #values: number[] = [0, 1, 0, DIRECTION.S]

  get q(): number {
    return this.#values[0]
  }

  get r(): number {
    return this.#values[1]
  }

  get s(): number {
    return this.#values[2]
  }

  get pointUp(): boolean {
    return isPointUp(this)
  }

  get direction(): DIRECTION {
    return this.#values[3]
  }

  constructor(coordinates: PartCoordinates<EdgeTriangle> = [0, 1, 0]) {
    const { q, r, s, direction } = toCube(coordinates, this)
    this.#values = [q, r, s, direction]
    if (!isTriangle({ q, r, s })) {
      throw new Error(
        `Invalid Triangle cube coordinates.
            Received: ${JSON.stringify({ q, r, s })}`
      )
    }
    if (![DIRECTION.N, DIRECTION.SEE, DIRECTION.SWW].includes(this.direction)) {
      throw new Error(
        `Invalid EdgeTriangle direction (DIRECTION.N | DIRECTION.SEE | DIRECTION.SWW):
          Received: ${this.direction}`
      )
    }
  }

  toString(): string {
    return cubeToString(this)
  }

  continue(direction: DIRECTION): Required<CubeCoordinates> | undefined {
    const continueSteps = continueMap.get(this.direction)
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
    const continueSteps = continueMap.get(this.direction)
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

  joins(): Map<DIRECTION, Omit<CubeCoordinates, 'direction'>> {
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

  endpoint(
    direction: DIRECTION
  ): Omit<CubeCoordinates, 'direction'> | undefined {
    const endpointSteps = endpointMap.get(this.direction)
    if (endpointSteps == null) return
    const endpoint = endpointSteps.get(direction)
    if (endpoint == null) return
    return {
      q: this.q + endpoint.q,
      r: this.r + endpoint.r,
      s: this.s + endpoint.s,
    }
  }

  endpoints(): Map<DIRECTION, Omit<CubeCoordinates, 'direction'>> {
    const results = new Map<DIRECTION, Omit<CubeCoordinates, 'direction'>>()
    const endpointSteps = endpointMap.get(this.direction)
    if (endpointSteps == null) return results
    endpointSteps.forEach((value, key) => {
      if (value == null) return
      results.set(key, {
        q: this.q + value.q,
        r: this.r + value.r,
        s: this.s + value.s,
      })
    })
    return results
  }
}

export const continueNSteps = new Map<DIRECTION, Required<CubeCoordinates>>([
  [DIRECTION.E, { q: 1, r: 0, s: -1, direction: DIRECTION.N }],
  [DIRECTION.W, { q: -1, r: 0, s: 1, direction: DIRECTION.N }],
])

export const continueSEESteps = new Map<DIRECTION, Required<CubeCoordinates>>([
  [DIRECTION.NNE, { q: 0, r: 1, s: -1, direction: DIRECTION.SEE }],
  [DIRECTION.SSW, { q: 0, r: -1, s: 1, direction: DIRECTION.SEE }],
])

export const continueSWWSteps = new Map<DIRECTION, Required<CubeCoordinates>>([
  [DIRECTION.NNW, { q: -1, r: 1, s: 0, direction: DIRECTION.SWW }],
  [DIRECTION.SSE, { q: 1, r: -1, s: 0, direction: DIRECTION.SWW }],
])

export const continueMap = new Map<
  DIRECTION,
  Map<DIRECTION, Required<CubeCoordinates>>
>([
  [DIRECTION.N, continueNSteps],
  [DIRECTION.SEE, continueSEESteps],
  [DIRECTION.SWW, continueSWWSteps],
])

export const joinNSteps = new Map<
  DIRECTION,
  Omit<CubeCoordinates, 'direction'>
>([
  [DIRECTION.N, { q: 0, r: 1, s: 0 }],
  [DIRECTION.S, { q: 0, r: 0, s: 0 }],
])

export const joinSEESteps = new Map<
  DIRECTION,
  Omit<CubeCoordinates, 'direction'>
>([
  [DIRECTION.NWW, { q: 0, r: 0, s: 0 }],
  [DIRECTION.SEE, { q: 1, r: 0, s: 0 }],
])

export const joinSWWSteps = new Map<
  DIRECTION,
  Omit<CubeCoordinates, 'direction'>
>([
  [DIRECTION.NEE, { q: 0, r: 0, s: 0 }],
  [DIRECTION.SWW, { q: 0, r: 0, s: 1 }],
])

export const joinMap = new Map<
  DIRECTION,
  Map<DIRECTION, Omit<CubeCoordinates, 'direction'>>
>([
  [DIRECTION.N, joinNSteps],
  [DIRECTION.SEE, joinSEESteps],
  [DIRECTION.SWW, joinSWWSteps],
])

export const endpointNSteps = new Map<
  DIRECTION,
  Omit<CubeCoordinates, 'direction'>
>([
  [DIRECTION.E, { q: 1, r: 0, s: -1 }],
  [DIRECTION.W, { q: 0, r: 0, s: 0 }],
])

export const endpointSEESteps = new Map<
  DIRECTION,
  Omit<CubeCoordinates, 'direction'>
>([
  [DIRECTION.NNE, { q: 1, r: 0, s: -1 }],
  [DIRECTION.SSW, { q: 1, r: -1, s: 0 }],
])

export const endpointSWWSteps = new Map<
  DIRECTION,
  Omit<CubeCoordinates, 'direction'>
>([
  [DIRECTION.NNW, { q: 0, r: 0, s: 0 }],
  [DIRECTION.SSE, { q: 1, r: -1, s: 0 }],
])

export const endpointMap = new Map<
  DIRECTION,
  Map<DIRECTION, Omit<CubeCoordinates, 'direction'>>
>([
  [DIRECTION.N, endpointNSteps],
  [DIRECTION.SEE, endpointSEESteps],
  [DIRECTION.SWW, endpointSWWSteps],
])
