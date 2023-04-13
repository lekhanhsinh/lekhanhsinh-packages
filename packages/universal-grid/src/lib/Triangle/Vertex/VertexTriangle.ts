import { defaultTriangleSettings, isPointUp } from '..'
import { PART_TYPE, SHAPE, DIRECTION } from '../../constants'
import {
  type CubeCoordinates,
  type OffsetCoordinates,
  type PointCoordinates,
  type PartCoordinates,
} from '../../types'
import { cubeToString } from '../../utils'
import { cubeToOffset } from '../Node/converters'
import { isTriangle } from '../isTriangle'
import { type TriangleSettings } from '../types'
import { toCube, toPixel } from './converters'

export class VertexTriangle
  implements
    Readonly<TriangleSettings>,
    Readonly<Omit<CubeCoordinates, 'direction'>>,
    Readonly<OffsetCoordinates>
{
  static readonly type = PART_TYPE.VERTEX
  static readonly shape = SHAPE.TRIANGLE
  readonly type = PART_TYPE.VERTEX
  readonly shape = SHAPE.TRIANGLE

  static get settings(): TriangleSettings {
    return defaultTriangleSettings
  }

  get size(): TriangleSettings['size'] {
    return (this.constructor as typeof VertexTriangle).settings.size
  }

  get origin(): TriangleSettings['origin'] {
    return (this.constructor as typeof VertexTriangle).settings.origin
  }

  get inverse(): { x: boolean; y: boolean } {
    return (this.constructor as typeof VertexTriangle).settings.inverse
  }

  get offset(): TriangleSettings['offset'] {
    return (this.constructor as typeof VertexTriangle).settings.offset
  }

  get col(): number {
    return cubeToOffset(this, this).col
  }

  get row(): number {
    return cubeToOffset(this, this).row
  }

  get center(): Omit<PointCoordinates, 'direction'> {
    return toPixel(this, this)
  }

  readonly #values = [0, 1, 0]

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

  constructor(coordinates: PartCoordinates<VertexTriangle> = [0, 1, 0]) {
    const { q, r, s } = toCube(coordinates, this)
    this.#values = [q, r, s]
    if (!isTriangle({ q, r, s })) {
      throw new Error(
        `Invalid Triangle cube coordinates.
            Received: ${JSON.stringify({ q, r, s })}`
      )
    }
  }

  toString(): string {
    return cubeToString(this)
  }

  touche(direction: DIRECTION): Omit<CubeCoordinates, 'direction'> | undefined {
    const touche = toucheSteps.get(direction)
    if (touche == null) return
    return { q: this.q + touche.q, r: this.r + touche.r, s: this.s + touche.s }
  }

  touches(): Map<DIRECTION, Omit<CubeCoordinates, 'direction'>> {
    const results = new Map<DIRECTION, Omit<CubeCoordinates, 'direction'>>()
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
    const protrude = protrudeSteps.get(direction)
    if (protrude == null) return
    return {
      q: this.q + protrude.q,
      r: this.r + protrude.r,
      s: this.s + protrude.s,
      direction: protrude.direction,
    }
  }

  protrudes(): Map<DIRECTION, Required<CubeCoordinates>> {
    const results = new Map<DIRECTION, Required<CubeCoordinates>>()
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

  adjacent(
    direction: DIRECTION
  ): Omit<CubeCoordinates, 'direction'> | undefined {
    const adjacent = adjacentSteps.get(direction)
    if (adjacent == null) return
    return {
      q: this.q + adjacent.q,
      r: this.r + adjacent.r,
      s: this.s + adjacent.s,
    }
  }

  adjacents(): Map<DIRECTION, Omit<CubeCoordinates, 'direction'>> {
    const results = new Map<DIRECTION, Omit<CubeCoordinates, 'direction'>>()
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

export const toucheSteps = new Map<
  DIRECTION,
  Omit<CubeCoordinates, 'direction'>
>([
  [DIRECTION.N, { q: -1, r: 1, s: 0 }],
  [DIRECTION.NEE, { q: 0, r: 1, s: 0 }],
  [DIRECTION.SEE, { q: 0, r: 0, s: 0 }],
  [DIRECTION.S, { q: 0, r: 0, s: 1 }],
  [DIRECTION.SWW, { q: -1, r: 0, s: 1 }],
  [DIRECTION.NWW, { q: -1, r: 1, s: 1 }],
])

export const protrudeSteps = new Map<DIRECTION, Required<CubeCoordinates>>([
  [DIRECTION.NNE, { q: -1, r: 1, s: 0, direction: DIRECTION.SEE }],
  [DIRECTION.E, { q: 0, r: 0, s: 0, direction: DIRECTION.N }],
  [DIRECTION.SSE, { q: 0, r: 0, s: 0, direction: DIRECTION.SWW }],
  [DIRECTION.SSW, { q: -1, r: 0, s: 1, direction: DIRECTION.SSE }],
  [DIRECTION.W, { q: -1, r: 0, s: 1, direction: DIRECTION.N }],
  [DIRECTION.NNW, { q: -1, r: 1, s: 0, direction: DIRECTION.SWW }],
])

export const adjacentSteps = new Map<
  DIRECTION,
  Omit<CubeCoordinates, 'direction'>
>([
  [DIRECTION.NNE, { q: 0, r: 1, s: -1 }],
  [DIRECTION.E, { q: 1, r: 0, s: -1 }],
  [DIRECTION.SSE, { q: 1, r: -1, s: 0 }],
  [DIRECTION.SSW, { q: 0, r: -1, s: 1 }],
  [DIRECTION.W, { q: -1, r: 0, s: 1 }],
  [DIRECTION.NNW, { q: -1, r: 1, s: 0 }],
])
