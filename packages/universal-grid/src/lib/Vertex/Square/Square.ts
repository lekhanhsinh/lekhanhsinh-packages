import { defaultSquareSettings } from '../../Node'
import { type SquareSettings } from '../../Node/types'
import { DIRECTION, PART_TYPE, SHAPE } from '../../constants'
import {
  type BoundingBox,
  type PointCoordinates,
  type CubeCoordinates,
  type EdgeCoordinates,
  type NodeCoordinates,
  OffsetCoordinates,
} from '../../types'
import { toCube, toPixel } from './converters'

export class VertexSquare
  implements
    Readonly<SquareSettings>,
    Readonly<CubeCoordinates>,
    Readonly<OffsetCoordinates>
{
  static readonly type = PART_TYPE.VERTEX
  static readonly shape = SHAPE.SQUARE
  readonly type = PART_TYPE.VERTEX
  readonly shape = SHAPE.SQUARE

  static get settings(): SquareSettings {
    return defaultSquareSettings
  }

  get size(): BoundingBox {
    return (this.constructor as typeof VertexSquare).settings.size
  }

  get anchor(): PointCoordinates {
    return (this.constructor as typeof VertexSquare).settings.anchor
  }

  get inverse(): { x: boolean; y: boolean } {
    return (this.constructor as typeof VertexSquare).settings.inverse
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

  constructor(coordinates: NodeCoordinates = [0, 0, 0]) {
    const { q, r, s } = toCube(coordinates, this)
    this.#values = [q, r, s]
  }

  toString(): string {
    return JSON.stringify({ q: this.q, r: this.r, s: this.s })
  }

  touche(direction: DIRECTION): CubeCoordinates | undefined {
    const touche = toucheSteps.get(direction)
    if (touche == null) return
    return { q: this.q + touche.q, r: this.r + touche.r, s: this.s + touche.s }
  }

  touches(): Map<DIRECTION, CubeCoordinates> {
    const results = new Map<DIRECTION, CubeCoordinates>()
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

  protrude(direction: DIRECTION): EdgeCoordinates | undefined {
    const protrude = protrudeSteps.get(direction)
    if (protrude == null) return
    return {
      q: this.q + protrude.q,
      r: this.r + protrude.r,
      s: this.s + protrude.s,
      direction: protrude.direction,
    }
  }

  protrudes = (): Map<DIRECTION, EdgeCoordinates> => {
    const results = new Map<DIRECTION, EdgeCoordinates>()
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

  adjacent(direction: DIRECTION): CubeCoordinates | undefined {
    const adjacent = adjacentSteps.get(direction)
    if (adjacent == null) return
    return {
      q: this.q + adjacent.q,
      r: this.r + adjacent.r,
      s: this.s + adjacent.s,
    }
  }

  adjacents(): Map<DIRECTION, CubeCoordinates> {
    const results = new Map<DIRECTION, CubeCoordinates>()
    adjacentSteps.forEach((value, key) => {
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

export const toucheSteps = new Map<DIRECTION, CubeCoordinates>([
  [DIRECTION.NE, { q: 0, r: 1, s: 0 }],
  [DIRECTION.SE, { q: 0, r: 0, s: 0 }],
  [DIRECTION.SW, { q: -1, r: 0, s: 0 }],
  [DIRECTION.NW, { q: -1, r: 1, s: 0 }],
])

export const protrudeSteps = new Map<DIRECTION, EdgeCoordinates>([
  [DIRECTION.N, { q: 0, r: 1, s: 0, direction: DIRECTION.W }],
  [DIRECTION.E, { q: 0, r: 0, s: 0, direction: DIRECTION.N }],
  [DIRECTION.S, { q: 0, r: 0, s: 0, direction: DIRECTION.W }],
  [DIRECTION.W, { q: -1, r: 0, s: 0, direction: DIRECTION.N }],
])

export const adjacentSteps = new Map<DIRECTION, CubeCoordinates>([
  [DIRECTION.N, { q: 0, r: 1, s: 0 }],
  [DIRECTION.E, { q: 1, r: 0, s: 0 }],
  [DIRECTION.S, { q: 0, r: -1, s: 0 }],
  [DIRECTION.W, { q: -1, r: 0, s: 0 }],
])
