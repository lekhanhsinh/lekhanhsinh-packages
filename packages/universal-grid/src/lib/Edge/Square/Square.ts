import { defaultSquareSettings } from '../../Node'
import { type SquareSettings } from '../../Node/types'
import { DIRECTION, PART_TYPE, SHAPE } from '../../constants'
import {
  type PointCoordinates,
  type EdgeCoordinates,
  type CubeCoordinates,
  type PartCoordinates,
  type OffsetCoordinates,
} from '../../types'
import { toCube, toPixel } from './converters'

export class EdgeSquare
  implements
    Readonly<SquareSettings>,
    Readonly<EdgeCoordinates>,
    Readonly<OffsetCoordinates>
{
  static readonly type = PART_TYPE.EDGE
  static readonly shape = SHAPE.SQUARE
  readonly type = PART_TYPE.EDGE
  readonly shape = SHAPE.SQUARE

  static get settings(): SquareSettings {
    return defaultSquareSettings
  }

  get size(): SquareSettings['size'] {
    return (this.constructor as typeof EdgeSquare).settings.size
  }

  get anchor(): SquareSettings['anchor'] {
    return (this.constructor as typeof EdgeSquare).settings.anchor
  }

  get inverse(): SquareSettings['inverse'] {
    return (this.constructor as typeof EdgeSquare).settings.inverse
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

  readonly #values = [0, 0, 0, DIRECTION.N]

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

  constructor(coordinates?: PartCoordinates<EdgeSquare>)
  constructor(
    coordinates: PartCoordinates<EdgeSquare> | EdgeCoordinates = [0, 0, 0]
  ) {
    const { q, r, s } = toCube(coordinates, this)
    this.#values = [q, r, s, (coordinates as EdgeCoordinates).direction]
    if (![DIRECTION.N, DIRECTION.W].includes(this.direction)) {
      throw new Error(
        `Invalid EdgeSquare direction: EdgeSquare direction is DIRECTION.N | DIRECTION.W. Received: ${this.direction}`
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

  continue(direction: DIRECTION): EdgeCoordinates | undefined {
    const continueSteps =
      this.direction === DIRECTION.W ? continueWSteps : continueNSteps
    const conti = continueSteps.get(direction)
    if (conti == null) return
    return {
      q: this.q + conti.q,
      r: this.r + conti.r,
      s: this.s + conti.s,
      direction: conti.direction,
    }
  }

  continues(): Map<DIRECTION, EdgeCoordinates> {
    const results = new Map<DIRECTION, EdgeCoordinates>()
    const continueSteps =
      this.direction === DIRECTION.W ? continueWSteps : continueNSteps
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

  join(direction: DIRECTION): CubeCoordinates | undefined {
    const joinSteps = this.direction === DIRECTION.W ? joinWSteps : joinNSteps
    const join = joinSteps.get(direction)
    if (join == null) return
    return { q: this.q + join.q, r: this.r + join.r, s: this.s + join.s }
  }

  joins = (): Map<DIRECTION, CubeCoordinates> => {
    const joinSteps = this.direction === DIRECTION.W ? joinWSteps : joinNSteps
    const results = new Map<DIRECTION, CubeCoordinates>()
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

  endpoint(direction: DIRECTION): CubeCoordinates | undefined {
    const endpointSteps =
      this.direction === DIRECTION.W ? endpointWSteps : endpointNSteps
    const endpoint = endpointSteps.get(direction)
    if (endpoint == null) return
    return {
      q: this.q + endpoint.q,
      r: this.r + endpoint.r,
      s: this.s + endpoint.s,
    }
  }

  endpoints = (): Map<DIRECTION, CubeCoordinates> => {
    const endpointSteps =
      this.direction === DIRECTION.W ? endpointWSteps : endpointNSteps
    const results = new Map<DIRECTION, CubeCoordinates>()
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

export const continueWSteps = new Map<DIRECTION, EdgeCoordinates>([
  [DIRECTION.N, { q: 0, r: 1, s: 0, direction: DIRECTION.W }],
  [DIRECTION.S, { q: 0, r: -1, s: 0, direction: DIRECTION.W }],
])

export const continueNSteps = new Map<DIRECTION, EdgeCoordinates>([
  [DIRECTION.E, { q: 1, r: 0, s: 0, direction: DIRECTION.N }],
  [DIRECTION.W, { q: -1, r: 0, s: 0, direction: DIRECTION.N }],
])

export const joinWSteps = new Map<DIRECTION, CubeCoordinates>([
  [DIRECTION.E, { q: -1, r: 0, s: 0 }],
  [DIRECTION.W, { q: 0, r: 0, s: 0 }],
])

export const joinNSteps = new Map<DIRECTION, CubeCoordinates>([
  [DIRECTION.N, { q: 0, r: 1, s: 0 }],
  [DIRECTION.S, { q: 0, r: 0, s: 0 }],
])

export const endpointWSteps = new Map<DIRECTION, CubeCoordinates>([
  [DIRECTION.N, { q: 0, r: 0, s: 0 }],
  [DIRECTION.S, { q: 0, r: -1, s: 0 }],
])

export const endpointNSteps = new Map<DIRECTION, CubeCoordinates>([
  [DIRECTION.E, { q: 1, r: 0, s: 0 }],
  [DIRECTION.W, { q: 0, r: 0, s: 0 }],
])
