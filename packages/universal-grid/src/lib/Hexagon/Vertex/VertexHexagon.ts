import { defaultHexagonSettings } from '..'
import { DIRECTION, PART_TYPE, SHAPE } from '../../constants'
import {
  type PointCoordinates,
  type CubeCoordinates,
  type PartCoordinates,
  type OffsetCoordinates,
} from '../../types'
import { type HexagonSettings } from '../types'
import { fromPixel, toCube, toPixel } from './converters'

export class VertexHexagon
  implements
    Readonly<HexagonSettings>,
    Readonly<Required<CubeCoordinates>>,
    Readonly<OffsetCoordinates>
{
  static fromPixel(coordinates: PointCoordinates): Required<CubeCoordinates> {
    return fromPixel(coordinates, this.settings)
  }

  static readonly type = PART_TYPE.VERTEX
  static readonly shape = SHAPE.HEXAGON
  readonly type = PART_TYPE.VERTEX
  readonly shape = SHAPE.HEXAGON

  static get settings(): HexagonSettings {
    return defaultHexagonSettings
  }

  get size(): HexagonSettings['size'] {
    return (this.constructor as typeof VertexHexagon).settings.size
  }

  get origin(): HexagonSettings['origin'] {
    return (this.constructor as typeof VertexHexagon).settings.origin
  }

  get inverse(): HexagonSettings['inverse'] {
    return (this.constructor as typeof VertexHexagon).settings.inverse
  }

  get isPointy(): HexagonSettings['isPointy'] {
    return (this.constructor as typeof VertexHexagon).settings.isPointy
  }

  get offset(): HexagonSettings['offset'] {
    return (this.constructor as typeof VertexHexagon).settings.offset
  }

  get col(): number {
    return this.q
  }

  get row(): number {
    return this.r
  }

  get center(): Omit<PointCoordinates, 'direction'> {
    return toPixel(this, this)
  }

  readonly #values = [0, 0, 0]

  get q(): number {
    return this.#values[0]
  }

  get r(): number {
    return this.#values[1]
  }

  get s(): number {
    return this.#values[2]
  }

  get direction(): number {
    return this.#values[3]
  }

  constructor(coordinates: PartCoordinates<VertexHexagon> = [0, 0, 0]) {
    const { q, r, s, direction } = toCube(coordinates, this)
    this.#values = [q, r, s, direction]
  }

  toString(): string {
    return JSON.stringify({
      q: this.q,
      r: this.r,
      s: this.s,
      direction: this.direction,
    })
  }

  touche(direction: DIRECTION): Omit<CubeCoordinates, 'direction'> | undefined {
    const toucheSteps = toucheMap.get(this.direction)
    if (toucheSteps == null) return
    const touche = toucheSteps.get(direction)
    if (touche == null) return
    return { q: this.q + touche.q, r: this.r + touche.r, s: this.s + touche.s }
  }

  touches(): Map<DIRECTION, Omit<CubeCoordinates, 'direction'>> {
    const results = new Map<DIRECTION, Omit<CubeCoordinates, 'direction'>>()
    const toucheSteps = toucheMap.get(this.direction)
    if (toucheSteps == null) return results
    toucheSteps.forEach((value, key) => {
      if (value == null) return
      results.set(key, {
        q: this.q + value.q,
        r: this.r + value.r,
        s: this.s + value.s,
      })
    })
    return results
  }

  protrude(direction: DIRECTION): Required<CubeCoordinates> | undefined {
    const protrudeSteps = protrudeMap.get(this.direction)
    if (protrudeSteps == null) return
    const protrude = protrudeSteps.get(direction)
    if (protrude == null) return
    return {
      q: this.q + protrude.q,
      r: this.r + protrude.r,
      s: this.s + protrude.s,
      direction: protrude.direction,
    }
  }

  protrudes = (): Map<DIRECTION, Required<CubeCoordinates>> => {
    const results = new Map<DIRECTION, Required<CubeCoordinates>>()
    const protrudeSteps = protrudeMap.get(this.direction)
    if (protrudeSteps == null) return results
    protrudeSteps.forEach((value, key) => {
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

  adjacent(direction: DIRECTION): Required<CubeCoordinates> | undefined {
    const adjacentSteps = adjacentMap.get(this.direction)
    if (adjacentSteps == null) return
    const adjacent = adjacentSteps.get(direction)
    if (adjacent == null) return
    return {
      q: this.q + adjacent.q,
      r: this.r + adjacent.r,
      s: this.s + adjacent.s,
      direction: adjacent.direction,
    }
  }

  adjacents(): Map<DIRECTION, Required<CubeCoordinates>> {
    const results = new Map<DIRECTION, Required<CubeCoordinates>>()
    const adjacentSteps = adjacentMap.get(this.direction)
    if (adjacentSteps == null) return results
    adjacentSteps.forEach((value, key) => {
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

export const touchePointyNSteps = new Map<
  DIRECTION,
  Omit<CubeCoordinates, 'direction'>
>([
  [DIRECTION.NWW, { q: 0, r: 1, s: -1 }],
  [DIRECTION.NEE, { q: 1, r: 0, s: -1 }],
  [DIRECTION.S, { q: 0, r: 0, s: 0 }],
])

export const touchePointySSteps = new Map<
  DIRECTION,
  Omit<CubeCoordinates, 'direction'>
>([
  [DIRECTION.N, { q: 0, r: 0, s: 0 }],
  [DIRECTION.SEE, { q: 0, r: -1, s: 1 }],
  [DIRECTION.SWW, { q: -1, r: 0, s: 1 }],
])

export const toucheFlatWSteps = new Map<
  DIRECTION,
  Omit<CubeCoordinates, 'direction'>
>([
  [DIRECTION.NNW, { q: -1, r: 1, s: 0 }],
  [DIRECTION.E, { q: 0, r: 0, s: 0 }],
  [DIRECTION.SSW, { q: -1, r: 0, s: 1 }],
])

export const toucheFlatESteps = new Map<
  DIRECTION,
  Omit<CubeCoordinates, 'direction'>
>([
  [DIRECTION.NNE, { q: 1, r: 0, s: 1 }],
  [DIRECTION.SSE, { q: 1, r: -1, s: 0 }],
  [DIRECTION.W, { q: 0, r: 0, s: 0 }],
])

export const toucheMap = new Map<
  DIRECTION,
  Map<DIRECTION, Omit<CubeCoordinates, 'direction'>>
>([
  [DIRECTION.W, toucheFlatWSteps],
  [DIRECTION.E, toucheFlatESteps],
  [DIRECTION.S, touchePointySSteps],
  [DIRECTION.N, touchePointyNSteps],
])

export const protrudePointyNSteps = new Map<
  DIRECTION,
  Required<CubeCoordinates>
>([
  [DIRECTION.N, { q: 1, r: 0, s: -1, direction: DIRECTION.W }],
  [DIRECTION.SEE, { q: 0, r: 0, s: 0, direction: DIRECTION.NNE }],
  [DIRECTION.SWW, { q: 0, r: 0, s: 0, direction: DIRECTION.NNW }],
])

export const protrudePointySSteps = new Map<
  DIRECTION,
  Required<CubeCoordinates>
>([
  [DIRECTION.NWW, { q: -1, r: 0, s: 1, direction: DIRECTION.NNE }],
  [DIRECTION.NEE, { q: 0, r: -1, s: 1, direction: DIRECTION.NNW }],
  [DIRECTION.S, { q: 0, r: -1, s: 1, direction: DIRECTION.W }],
])

export const protrudeFlatWSteps = new Map<DIRECTION, Required<CubeCoordinates>>(
  [
    [DIRECTION.W, { q: -1, r: 0, s: 1, direction: DIRECTION.N }],
    [DIRECTION.NNE, { q: 0, r: 0, s: 0, direction: DIRECTION.NWW }],
    [DIRECTION.SSE, { q: -1, r: 0, s: 1, direction: DIRECTION.NEE }],
  ]
)

export const protrudeFlatESteps = new Map<DIRECTION, Required<CubeCoordinates>>(
  [
    [DIRECTION.E, { q: 1, r: -1, s: 0, direction: DIRECTION.N }],
    [DIRECTION.SSW, { q: 1, r: -1, s: 0, direction: DIRECTION.NWW }],
    [DIRECTION.NNW, { q: 0, r: 0, s: 0, direction: DIRECTION.NEE }],
  ]
)

export const protrudeMap = new Map<
  DIRECTION,
  Map<DIRECTION, Required<CubeCoordinates>>
>([
  [DIRECTION.W, protrudeFlatWSteps],
  [DIRECTION.E, protrudeFlatESteps],
  [DIRECTION.S, protrudePointySSteps],
  [DIRECTION.N, protrudePointyNSteps],
])

export const adjacentPointyNSteps = new Map<
  DIRECTION,
  Required<CubeCoordinates>
>([
  [DIRECTION.N, { q: 1, r: 1, s: -2, direction: DIRECTION.S }],
  [DIRECTION.SEE, { q: 1, r: 0, s: -1, direction: DIRECTION.S }],
  [DIRECTION.SWW, { q: 0, r: 1, s: -1, direction: DIRECTION.S }],
])

export const adjacentPointySSteps = new Map<
  DIRECTION,
  Required<CubeCoordinates>
>([
  [DIRECTION.S, { q: -1, r: -1, s: 2, direction: DIRECTION.N }],
  [DIRECTION.NWW, { q: -1, r: 0, s: 1, direction: DIRECTION.N }],
  [DIRECTION.NEE, { q: 0, r: -1, s: 1, direction: DIRECTION.N }],
])

export const adjacentFlatWSteps = new Map<DIRECTION, Required<CubeCoordinates>>(
  [
    [DIRECTION.W, { q: -2, r: 1, s: 1, direction: DIRECTION.E }],
    [DIRECTION.NNE, { q: -1, r: 1, s: 0, direction: DIRECTION.E }],
    [DIRECTION.SSE, { q: -1, r: 0, s: 1, direction: DIRECTION.E }],
  ]
)

export const adjacentFlatESteps = new Map<DIRECTION, Required<CubeCoordinates>>(
  [
    [DIRECTION.E, { q: 2, r: -1, s: -1, direction: DIRECTION.W }],
    [DIRECTION.SSW, { q: 1, r: -1, s: 0, direction: DIRECTION.W }],
    [DIRECTION.NNW, { q: 1, r: 0, s: -1, direction: DIRECTION.W }],
  ]
)

export const adjacentMap = new Map<
  DIRECTION,
  Map<DIRECTION, Required<CubeCoordinates>>
>([
  [DIRECTION.W, adjacentFlatWSteps],
  [DIRECTION.E, adjacentFlatESteps],
  [DIRECTION.S, adjacentPointySSteps],
  [DIRECTION.N, adjacentPointyNSteps],
])
