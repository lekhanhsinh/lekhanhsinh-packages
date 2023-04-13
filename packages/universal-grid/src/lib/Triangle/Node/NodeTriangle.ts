import { type TriangleSettings } from '../types'
import {
  type CubeCoordinates,
  type OffsetCoordinates,
  type PointCoordinates,
  type PartCoordinates,
} from '../../types'
import { DIRECTION, PART_TYPE, SHAPE } from '../../constants'
import { cubeToOffset, toCube, toPixel } from './converters'
import { defaultTriangleSettings, isPointUp, isTriangle } from '..'
import { cubeToString } from '../../utils'
import { circleFilled, lineWalk, rectangleFilled } from './traversers'

export class NodeTriangle
  implements
    Readonly<TriangleSettings>,
    Readonly<Omit<CubeCoordinates, 'direction'>>,
    Readonly<OffsetCoordinates>
{
  static lineWalk = lineWalk
  static rectangleFilled = rectangleFilled
  static circleFilled = circleFilled

  static readonly type = PART_TYPE.NODE
  static readonly shape = SHAPE.TRIANGLE
  readonly type = PART_TYPE.NODE
  readonly shape = SHAPE.TRIANGLE

  static get settings(): TriangleSettings {
    return defaultTriangleSettings
  }

  get size(): TriangleSettings['size'] {
    return (this.constructor as typeof NodeTriangle).settings.size
  }

  get origin(): TriangleSettings['origin'] {
    return (this.constructor as typeof NodeTriangle).settings.origin
  }

  get inverse(): TriangleSettings['inverse'] {
    return (this.constructor as typeof NodeTriangle).settings.inverse
  }

  get offset(): TriangleSettings['offset'] {
    return (this.constructor as typeof NodeTriangle).settings.offset
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

  constructor(coordinates: PartCoordinates<NodeTriangle> = [0, 1, 0]) {
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

  neighbor(
    direction: DIRECTION
  ): Omit<CubeCoordinates, 'direction'> | undefined {
    const neighbor = (this.pointUp ? neighborUpSteps : neighborDownSteps).get(
      direction
    )
    if (neighbor == null) return
    return {
      q: this.q + neighbor.q,
      r: this.r + neighbor.r,
      s: this.s + neighbor.s,
    }
  }

  neighbors(): Map<DIRECTION, Omit<CubeCoordinates, 'direction'>> {
    const results = new Map<DIRECTION, Omit<CubeCoordinates, 'direction'>>()
    ;(this.pointUp ? neighborUpSteps : neighborDownSteps).forEach(
      (value, key) => {
        if (value == null) return
        results.set(key, {
          q: this.q + value.q,
          r: this.r + value.r,
          s: this.s + value.s,
        })
      }
    )
    return results
  }

  border(direction: DIRECTION): Required<CubeCoordinates> | undefined {
    const border = (this.pointUp ? borderUpSteps : borderDownSteps).get(
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

  borders(): Map<DIRECTION, Required<CubeCoordinates>> {
    const results = new Map<DIRECTION, Required<CubeCoordinates>>()
    ;(this.pointUp ? borderUpSteps : borderDownSteps).forEach((value, key) => {
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
    const corner = (this.pointUp ? cornerUpSteps : cornerDownSteps).get(
      direction
    )
    if (corner == null) return
    return { q: this.q + corner.q, r: this.r + corner.r, s: this.s + corner.s }
  }

  corners(): Map<DIRECTION, Omit<CubeCoordinates, 'direction'>> {
    const results = new Map<DIRECTION, Omit<CubeCoordinates, 'direction'>>()
    ;(this.pointUp ? cornerUpSteps : cornerDownSteps).forEach((value, key) => {
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

export const neighborUpSteps = new Map<
  DIRECTION,
  Omit<CubeCoordinates, 'direction'>
>([
  [DIRECTION.NEE, { q: 0, r: 0, s: -1 }],
  [DIRECTION.S, { q: 0, r: -1, s: 0 }],
  [DIRECTION.NWW, { q: -1, r: 0, s: 0 }],
])

export const neighborDownSteps = new Map<
  DIRECTION,
  Omit<CubeCoordinates, 'direction'>
>([
  [DIRECTION.N, { q: 0, r: 1, s: 0 }],
  [DIRECTION.SEE, { q: 1, r: 0, s: 0 }],
  [DIRECTION.SWW, { q: 0, r: 0, s: 1 }],
])

export const borderUpSteps = new Map<DIRECTION, Required<CubeCoordinates>>([
  [DIRECTION.NEE, { q: 0, r: 0, s: -1, direction: DIRECTION.SWW }],
  [DIRECTION.S, { q: 0, r: -1, s: 0, direction: DIRECTION.N }],
  [DIRECTION.NWW, { q: -1, r: 0, s: 0, direction: DIRECTION.SEE }],
])

export const borderDownSteps = new Map<DIRECTION, Required<CubeCoordinates>>([
  [DIRECTION.N, { q: 0, r: 0, s: 0, direction: DIRECTION.N }],
  [DIRECTION.SEE, { q: 0, r: 0, s: 0, direction: DIRECTION.SEE }],
  [DIRECTION.SWW, { q: 0, r: 0, s: 0, direction: DIRECTION.SWW }],
])

export const cornerUpSteps = new Map<
  DIRECTION,
  Omit<CubeCoordinates, 'direction'>
>([
  [DIRECTION.N, { q: 0, r: 0, s: -1 }],
  [DIRECTION.SEE, { q: 0, r: -1, s: 0 }],
  [DIRECTION.SWW, { q: 1, r: -1, s: -1 }],
])

export const cornerDownSteps = new Map<
  DIRECTION,
  Omit<CubeCoordinates, 'direction'>
>([
  [DIRECTION.NWW, { q: 0, r: 0, s: 0 }],
  [DIRECTION.S, { q: 1, r: -1, s: 0 }],
  [DIRECTION.NEE, { q: 1, r: 0, s: -1 }],
])

export const Triangle = NodeTriangle
