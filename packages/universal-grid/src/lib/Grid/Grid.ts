/* eslint-disable @typescript-eslint/no-explicit-any */
import { type NodeClass } from '../Node/types'
import { PART_RELATIONS, PART_TYPE, type SHAPE } from '../constants'
import {
  type PartCoordinates,
  type CubeCoordinates,
  type EdgeCoordinates,
} from '../types'
import { concat, fromCoordinates, repeat, repeatWith } from './traversers'
import {
  type PartConstructor,
  type PartClass,
  type Traverser,
  type Traversable,
} from './types'

export class Grid<T extends PartClass>
  extends Map<string, T>
  implements Traversable<T>
{
  static concat = concat
  static fromCoordinates = fromCoordinates
  static repeat = repeat
  static repeatWith = repeatWith

  readonly #partClass: PartConstructor<T>

  get first(): T | undefined {
    return this.toArray().at(0)
  }

  get last(): T | undefined {
    return this.toArray().at(-1)
  }

  get type(): PART_TYPE {
    return (this.#partClass as any).type
  }

  get shape(): SHAPE {
    return (this.#partClass as any).shape
  }

  #getAllParts(
    grid: Grid<PartClass>
  ): Array<CubeCoordinates | EdgeCoordinates> {
    let results: Array<CubeCoordinates | EdgeCoordinates> = []
    const relation = PART_RELATIONS.get(`${grid.type},${this.type}`)
    const relation1 = PART_RELATIONS.get(`${this.type},${grid.type}`)
    if (relation == null || relation1 == null) {
      return results
    }

    const arr = grid.toArray()
    arr.forEach((part) => {
      results.push(...(part as Record<string, any>)[relation]().values())
    })

    if (this.type === PART_TYPE.NODE) {
      results = results.filter((n) => {
        const parts: any[] = Array.from(
          (
            new (this.#partClass as PartConstructor<NodeClass>)(n) as Record<
              string,
              any
            >
          )
            [relation1]()
            .values()
        )
        return parts.every((b) =>
          arr.some((e: any) =>
            b.q === e.q && b.r === e.r && b.s === e.s && b.direction != null
              ? b.direction === e.direction
              : true
          )
        )
      })
    }
    return results
  }

  // prettier-ignore
  constructor(partClass: PartConstructor<T>)
  // prettier-ignore
  constructor(partClass: PartConstructor<T>, traversers: Traverser<T> | Array<Traverser<T>>)
  // prettier-ignore
  constructor(partClass: PartConstructor<T>, parts: Iterable<T | PartCoordinates<T>>)
  // prettier-ignore
  constructor(grid: Grid<T>)
  // prettier-ignore
  constructor(partClass: PartConstructor<T>, grid: Grid<any>)
  constructor(
    partClassOrGrid: PartConstructor<T> | Grid<T>,
    gridOrInput:
      | Traverser<T>
      | Array<Traverser<T>>
      | Iterable<T | PartCoordinates<T>>
      | Grid<T>
      | Grid<PartClass> = []
  ) {
    super()
    if (partClassOrGrid instanceof Grid) {
      this.#partClass = partClassOrGrid.#partClass
      this.append(partClassOrGrid)
    } else if (gridOrInput instanceof Grid) {
      this.#partClass = partClassOrGrid
      const input = this.#getAllParts(gridOrInput as Grid<PartClass>)
      this.append(input as never)
    } else {
      this.#partClass = partClassOrGrid
      this.append(gridOrInput as never)
    }
  }

  create(coordinates?: PartCoordinates<T>): T {
    return new this.#partClass(coordinates as never)
  }

  #callTraverser(traverser: Traverser<T>): T[] {
    return traverser(this.create.bind(this), this.last, this)
  }

  #createsFromIterableOrTraversers(
    input:
      | Traverser<T>
      | Array<Traverser<T>>
      | Iterable<T | PartCoordinates<T>>
      | Grid<T>
  ): Array<T | PartCoordinates<T>> {
    if (typeof input === 'function') {
      return this.#callTraverser(input)
    } else if (Array.isArray(input) && typeof input[0] === 'function') {
      return this.#callTraverser(concat(input))
    } else if (input instanceof Grid) {
      return Array.from(input.values())
    } else {
      return input as Array<T | PartCoordinates<T>>
    }
  }

  append: Traversable<T>['append'] = (
    input:
      | Traverser<T>
      | Array<Traverser<T>>
      | Iterable<T | PartCoordinates<T>>
      | Grid<T>
  ): Grid<T> => {
    for (const partOrCoordinates of this.#createsFromIterableOrTraversers(
      input
    )) {
      const part =
        partOrCoordinates instanceof this.#partClass
          ? partOrCoordinates
          : new this.#partClass(partOrCoordinates as never)
      const found = this.get(part.toString())
      if (found == null) {
        this.set(part.toString(), part)
      }
    }
    return this
  }

  traverse: Traversable<T>['traverse'] = (
    input:
      | Traverser<T>
      | Array<Traverser<T>>
      | Iterable<T | PartCoordinates<T>>
      | Grid<T>,
    { bail = false, reverse = false } = {}
  ): Grid<T> => {
    const result = new Grid(this.#partClass)
    const arr = this.#createsFromIterableOrTraversers(input)
    if (reverse) {
      arr.reverse()
    }
    for (const partOrCoordinates of arr) {
      const part =
        partOrCoordinates instanceof this.#partClass
          ? partOrCoordinates
          : new this.#partClass(partOrCoordinates as never)
      const found = this.get(part.toString())
      if (found != null) {
        result.set(part.toString(), part)
      } else if (bail) {
        return result
      }
    }
    return result
  }

  toArray(): T[] {
    return Array.from(this.values())
  }
}
