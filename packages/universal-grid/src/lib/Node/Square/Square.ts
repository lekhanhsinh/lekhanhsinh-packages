import { type SquareSettings } from '../types'
import {
  type CubeCoordinates,
  type OffsetCoordinates,
  type BoundingBox,
  type PointCoordinates,
  type NodeCoordinates,
  type EdgeCoordinates,
} from '../../types'
import { DIRECTION, PART_TYPE, SHAPE } from '../../constants'
import { isCube, isOffset, isTuple, tupleToCube } from '../../utils'
import { fromPixel, toPixel } from './converters'

export class Square
  implements
    Readonly<SquareSettings>,
    Readonly<CubeCoordinates>,
    Readonly<OffsetCoordinates>
{
  static readonly type = PART_TYPE.NODE
  static readonly shape = SHAPE.SQUARE
  readonly type = PART_TYPE.NODE
  readonly shape = SHAPE.SQUARE

  static get settings(): SquareSettings {
    return defaultSquareSettings
  }

  get size(): BoundingBox {
    return (this.constructor as typeof Square).settings.size
  }

  get anchor(): PointCoordinates {
    return (this.constructor as typeof Square).settings.anchor
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

  static #toCube(coordinates: NodeCoordinates): CubeCoordinates {
    if (isCube(coordinates)) {
      return coordinates
    } else if (isOffset(coordinates)) {
      return { q: coordinates.col, r: coordinates.row, s: 0 }
    } else if (isTuple(coordinates)) {
      return tupleToCube(coordinates)
    } else {
      return fromPixel(
        coordinates as PointCoordinates,
        (this.constructor as typeof Square).settings
      )
    }
  }

  constructor(coordinates: NodeCoordinates = [0, 0, 0]) {
    const { q, r, s } = Square.#toCube(coordinates)
    this.#values = [q, r, s]
  }

  toString(): string {
    return JSON.stringify({ q: this.q, r: this.r, s: this.s })
  }

  neighbor(direction: DIRECTION): CubeCoordinates | undefined {
    const neighbor = neighborSteps.get(direction)
    if (neighbor == null) return
    return {
      q: this.q + neighbor.q,
      r: this.r + neighbor.r,
      s: this.s + neighbor.s,
    }
  }

  neighbors(): Map<DIRECTION, CubeCoordinates> {
    const results = new Map<DIRECTION, CubeCoordinates>()
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

  border(direction: DIRECTION): EdgeCoordinates | undefined {
    const border = borderSteps.get(direction)
    if (border == null) return
    return {
      q: this.q + border.q,
      r: this.r + border.r,
      s: this.s + border.s,
      direction: border.direction,
    }
  }

  borders = (): Map<DIRECTION, EdgeCoordinates> => {
    const results = new Map<DIRECTION, EdgeCoordinates>()
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

  corner(direction: DIRECTION): CubeCoordinates | undefined {
    const corner = cornerSteps.get(direction)
    if (corner == null) return
    return { q: this.q + corner.q, r: this.r + corner.r, s: this.s + corner.s }
  }

  corners = (): Map<DIRECTION, CubeCoordinates> => {
    const results = new Map<DIRECTION, CubeCoordinates>()
    cornerSteps.forEach((value, key) => {
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

export const defaultSquareSettings: Required<SquareSettings> = {
  anchor: { x: 0, y: 0 },
  size: { width: 32, height: 32 },
}

export const neighborSteps = new Map<DIRECTION, CubeCoordinates>([
  [DIRECTION.N, { q: 0, r: 1, s: 0 }],
  [DIRECTION.E, { q: 1, r: 0, s: 0 }],
  [DIRECTION.S, { q: 0, r: -1, s: 0 }],
  [DIRECTION.W, { q: -1, r: 0, s: 0 }],
])

export const borderSteps = new Map<DIRECTION, EdgeCoordinates>([
  [DIRECTION.N, { q: 0, r: 0, s: 0, direction: DIRECTION.N }],
  [DIRECTION.E, { q: 1, r: 0, s: 0, direction: DIRECTION.W }],
  [DIRECTION.S, { q: 0, r: -1, s: 0, direction: DIRECTION.N }],
  [DIRECTION.W, { q: 0, r: 0, s: 0, direction: DIRECTION.W }],
])

export const cornerSteps = new Map<DIRECTION, CubeCoordinates>([
  [DIRECTION.NW, { q: 0, r: 0, s: 0 }],
  [DIRECTION.NE, { q: 1, r: 0, s: 0 }],
  [DIRECTION.SE, { q: 1, r: -1, s: 0 }],
  [DIRECTION.SW, { q: 0, r: -1, s: 0 }],
])