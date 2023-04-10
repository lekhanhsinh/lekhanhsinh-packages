import {
  type CubeCoordinates,
  type OffsetCoordinates,
  type PointCoordinates,
  type PartCoordinates,
} from '../../types'
import { DIRECTION, PART_TYPE, SHAPE } from '../../constants'
import { cubeToOffset, toCube, toPixel } from './converters'
import { type HexagonSettings } from '../types'
import { defaultHexagonSettings } from '..'
import {
  circleFilled,
  circleOutline,
  lineWalk,
  rectangleFilled,
} from './traversers'

export class NodeHexagon
  implements
    Readonly<HexagonSettings>,
    Readonly<Omit<CubeCoordinates, 'direction'>>,
    Readonly<OffsetCoordinates>
{
  static lineWalk = lineWalk
  static rectangleFilled = rectangleFilled
  static circleOutline = circleOutline
  static circleFilled = circleFilled

  static readonly type = PART_TYPE.NODE
  static readonly shape = SHAPE.HEXAGON
  readonly type = PART_TYPE.NODE
  readonly shape = SHAPE.HEXAGON

  static get settings(): HexagonSettings {
    return defaultHexagonSettings
  }

  get size(): HexagonSettings['size'] {
    return (this.constructor as typeof NodeHexagon).settings.size
  }

  get origin(): HexagonSettings['origin'] {
    return (this.constructor as typeof NodeHexagon).settings.origin
  }

  get inverse(): HexagonSettings['inverse'] {
    return (this.constructor as typeof NodeHexagon).settings.inverse
  }

  get isPointy(): HexagonSettings['isPointy'] {
    return (this.constructor as typeof NodeHexagon).settings.isPointy
  }

  get offset(): HexagonSettings['offset'] {
    return (this.constructor as typeof NodeHexagon).settings.offset
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

  constructor(coordinates: PartCoordinates<NodeHexagon> = [0, 0, 0]) {
    const { q, r, s } = toCube(coordinates, this)
    this.#values = [q, r, s]
  }

  toString(): string {
    return JSON.stringify({ q: this.q, r: this.r, s: this.s })
  }

  neighbor(
    direction: DIRECTION
  ): Readonly<Omit<CubeCoordinates, 'direction'>> | undefined {
    const neighbor = (
      this.isPointy ? neighborPointySteps : neighborFlatSteps
    ).get(direction)
    if (neighbor == null) return
    return {
      q: this.q + neighbor.q,
      r: this.r + neighbor.r,
      s: this.s + neighbor.s,
    }
  }

  neighbors(): Map<DIRECTION, Readonly<Omit<CubeCoordinates, 'direction'>>> {
    const results = new Map<
      DIRECTION,
      Readonly<Omit<CubeCoordinates, 'direction'>>
    >()
    const neighborSteps = this.isPointy
      ? neighborPointySteps
      : neighborFlatSteps
    neighborSteps.forEach((value, key) => {
      if (value == null) return
      results.set(key, {
        q: this.q + value.q,
        r: this.r + value.r,
        s: this.s + value.s,
      })
    })
    return results
  }

  border(direction: DIRECTION): Required<CubeCoordinates> | undefined {
    const border = (this.isPointy ? borderPointySteps : borderFlatSteps).get(
      direction
    )
    if (border == null) return
    return {
      q: this.q + border.q,
      r: this.r + border.r,
      s: this.s + border.s,
      direction: border.direction,
    }
  }

  borders = (): Map<DIRECTION, Required<CubeCoordinates>> => {
    const results = new Map<DIRECTION, Required<CubeCoordinates>>()
    const borderSteps = this.isPointy ? borderPointySteps : borderFlatSteps
    borderSteps.forEach((value, key) => {
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

  corner(direction: DIRECTION): Required<CubeCoordinates> | undefined {
    const corner = (this.isPointy ? cornerPointySteps : cornerFlatSteps).get(
      direction
    )
    if (corner == null) return
    return {
      q: this.q + corner.q,
      r: this.r + corner.r,
      s: this.s + corner.s,
      direction: corner.direction,
    }
  }

  corners = (): Map<DIRECTION, Required<CubeCoordinates>> => {
    const results = new Map<DIRECTION, Required<CubeCoordinates>>()
    const cornerSteps = this.isPointy ? cornerPointySteps : cornerFlatSteps
    cornerSteps.forEach((value, key) => {
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

export const neighborFlatSteps = new Map<
  DIRECTION,
  Readonly<Omit<CubeCoordinates, 'direction'>>
>([
  [DIRECTION.N, { q: 0, r: 1, s: 0 }],
  [DIRECTION.NEE, { q: 1, r: 0, s: -1 }],
  [DIRECTION.SEE, { q: 1, r: -1, s: 0 }],
  [DIRECTION.S, { q: 0, r: -1, s: 1 }],
  [DIRECTION.SWW, { q: -1, r: 0, s: 1 }],
  [DIRECTION.NWW, { q: -1, r: 1, s: 0 }],
])

export const neighborPointySteps = new Map<
  DIRECTION,
  Readonly<Omit<CubeCoordinates, 'direction'>>
>([
  [DIRECTION.NNE, { q: 1, r: 0, s: -1 }],
  [DIRECTION.E, { q: 1, r: -1, s: 0 }],
  [DIRECTION.SSE, { q: 0, r: -1, s: 1 }],
  [DIRECTION.SSW, { q: -1, r: 0, s: 1 }],
  [DIRECTION.W, { q: -1, r: 1, s: 0 }],
  [DIRECTION.NNW, { q: 0, r: 1, s: -1 }],
])

export const borderFlatSteps = new Map<DIRECTION, Required<CubeCoordinates>>([
  [DIRECTION.N, { q: 0, r: 0, s: 0, direction: DIRECTION.N }],
  [DIRECTION.NEE, { q: 0, r: 0, s: 0, direction: DIRECTION.NEE }],
  [DIRECTION.SEE, { q: 1, r: -1, s: 0, direction: DIRECTION.NWW }],
  [DIRECTION.S, { q: 0, r: -1, s: 1, direction: DIRECTION.N }],
  [DIRECTION.SWW, { q: -1, r: 0, s: 1, direction: DIRECTION.NEE }],
  [DIRECTION.NWW, { q: 0, r: 0, s: 0, direction: DIRECTION.NWW }],
])

export const borderPointySteps = new Map<DIRECTION, Required<CubeCoordinates>>([
  [DIRECTION.NNE, { q: 0, r: 0, s: 0, direction: DIRECTION.NNE }],
  [DIRECTION.E, { q: 1, r: -1, s: 0, direction: DIRECTION.W }],
  [DIRECTION.SSE, { q: 0, r: -1, s: 1, direction: DIRECTION.NNW }],
  [DIRECTION.SSW, { q: -1, r: 0, s: 1, direction: DIRECTION.NNE }],
  [DIRECTION.W, { q: 0, r: 0, s: 0, direction: DIRECTION.W }],
  [DIRECTION.NNW, { q: 0, r: 0, s: 0, direction: DIRECTION.NNW }],
])

export const cornerFlatSteps = new Map<DIRECTION, Required<CubeCoordinates>>([
  [DIRECTION.NNE, { q: 1, r: 0, s: -1, direction: DIRECTION.W }],
  [DIRECTION.E, { q: 0, r: 0, s: 0, direction: DIRECTION.E }],
  [DIRECTION.SSE, { q: 1, r: -1, s: 0, direction: DIRECTION.W }],
  [DIRECTION.SSW, { q: -1, r: 0, s: 1, direction: DIRECTION.E }],
  [DIRECTION.W, { q: 0, r: 0, s: 0, direction: DIRECTION.W }],
  [DIRECTION.NNW, { q: -1, r: 1, s: 0, direction: DIRECTION.E }],
])

export const cornerPointySteps = new Map<DIRECTION, Required<CubeCoordinates>>([
  [DIRECTION.N, { q: 0, r: 0, s: 0, direction: DIRECTION.N }],
  [DIRECTION.NEE, { q: 1, r: 0, s: -1, direction: DIRECTION.S }],
  [DIRECTION.SEE, { q: 0, r: -1, s: 1, direction: DIRECTION.N }],
  [DIRECTION.S, { q: 0, r: 0, s: 0, direction: DIRECTION.S }],
  [DIRECTION.SWW, { q: -1, r: 0, s: 1, direction: DIRECTION.N }],
  [DIRECTION.NWW, { q: 0, r: 1, s: -1, direction: DIRECTION.S }],
])

export const Hexagon = NodeHexagon
