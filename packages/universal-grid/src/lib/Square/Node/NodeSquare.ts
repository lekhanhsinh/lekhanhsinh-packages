import { type SquareSettings } from '../types'
import {
  type CubeCoordinates,
  type OffsetCoordinates,
  type PointCoordinates,
  type PartCoordinates,
} from '../../types'
import { DIRECTION, PART_TYPE, SHAPE } from '../../constants'
import { toCube, toPixel } from './converters'
import { ellipseFilled, lineWalk, rectangleFilled } from './traversers'
import { defaultSquareSettings } from '..'
import { cubeToString } from '../../utils'

export class NodeSquare
  implements
    Readonly<SquareSettings>,
    Readonly<Omit<CubeCoordinates, 'direction'>>,
    Readonly<OffsetCoordinates>
{
  static lineWalk = lineWalk
  static rectangleFilled = rectangleFilled
  static ellipseFilled = ellipseFilled

  static readonly type = PART_TYPE.NODE
  static readonly shape = SHAPE.SQUARE
  readonly type = PART_TYPE.NODE
  readonly shape = SHAPE.SQUARE

  static get settings(): SquareSettings {
    return defaultSquareSettings
  }

  get size(): SquareSettings['size'] {
    return (this.constructor as typeof NodeSquare).settings.size
  }

  get origin(): SquareSettings['origin'] {
    return (this.constructor as typeof NodeSquare).settings.origin
  }

  get inverse(): SquareSettings['inverse'] {
    return (this.constructor as typeof NodeSquare).settings.inverse
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

  constructor(coordinates: PartCoordinates<NodeSquare> = [0, 0, 0]) {
    const { q, r, s } = toCube(coordinates, this)
    this.#values = [q, r, s]
  }

  toString(): string {
    return cubeToString(this)
  }

  neighbor(
    direction: DIRECTION
  ): Omit<CubeCoordinates, 'direction'> | undefined {
    const neighbor = neighborSteps.get(direction)
    if (neighbor == null) return
    return {
      q: this.q + neighbor.q,
      r: this.r + neighbor.r,
      s: this.s + neighbor.s,
    }
  }

  neighbors(): Map<DIRECTION, Omit<CubeCoordinates, 'direction'>> {
    const results = new Map<DIRECTION, Omit<CubeCoordinates, 'direction'>>()
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
    const border = borderSteps.get(direction)
    if (border == null) return
    return {
      q: this.q + border.q,
      r: this.r + border.r,
      s: this.s + border.s,
      direction: border.direction,
    }
  }

  borders(): Map<DIRECTION, Required<CubeCoordinates>> {
    const results = new Map<DIRECTION, Required<CubeCoordinates>>()
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

  corner(direction: DIRECTION): Omit<CubeCoordinates, 'direction'> | undefined {
    const corner = cornerSteps.get(direction)
    if (corner == null) return
    return { q: this.q + corner.q, r: this.r + corner.r, s: this.s + corner.s }
  }

  corners(): Map<DIRECTION, Omit<CubeCoordinates, 'direction'>> {
    const results = new Map<DIRECTION, Omit<CubeCoordinates, 'direction'>>()
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

export const neighborSteps = new Map<
  DIRECTION,
  Omit<CubeCoordinates, 'direction'>
>([
  [DIRECTION.N, { q: 0, r: 1, s: 0 }],
  [DIRECTION.E, { q: 1, r: 0, s: 0 }],
  [DIRECTION.S, { q: 0, r: -1, s: 0 }],
  [DIRECTION.W, { q: -1, r: 0, s: 0 }],
])

export const borderSteps = new Map<DIRECTION, Required<CubeCoordinates>>([
  [DIRECTION.N, { q: 0, r: 0, s: 0, direction: DIRECTION.N }],
  [DIRECTION.E, { q: 1, r: 0, s: 0, direction: DIRECTION.W }],
  [DIRECTION.S, { q: 0, r: -1, s: 0, direction: DIRECTION.N }],
  [DIRECTION.W, { q: 0, r: 0, s: 0, direction: DIRECTION.W }],
])

export const cornerSteps = new Map<
  DIRECTION,
  Omit<CubeCoordinates, 'direction'>
>([
  [DIRECTION.NW, { q: 0, r: 0, s: 0 }],
  [DIRECTION.NE, { q: 1, r: 0, s: 0 }],
  [DIRECTION.SE, { q: 1, r: -1, s: 0 }],
  [DIRECTION.SW, { q: 0, r: -1, s: 0 }],
])

export const Square = NodeSquare
