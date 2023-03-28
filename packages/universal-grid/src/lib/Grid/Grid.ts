/* eslint-disable @typescript-eslint/no-explicit-any */
import { type EdgeClass } from '../Edge/types'
import { type NodeClass } from '../Node/types'
import { type VertexClass } from '../Vertex/types'
import { PART_TYPE, type SHAPE } from '../constants'
import { type CubeCoordinates, type EdgeCoordinates } from '../types'
import { concat, fromCoordinates, repeat, repeatWith } from './traversers'
import {
  type PartConstructor,
  type PartClass,
  type Traverser,
  type PartCoordinates,
  Traversable,
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

  // prettier-ignore
  constructor(partClass: PartConstructor<T>)
  // prettier-ignore
  constructor(partClass: PartConstructor<T>, traversers: Traverser<T> | Array<Traverser<T>>)
  // prettier-ignore
  constructor(partClass: PartConstructor<T>, parts: Iterable<T | PartCoordinates>)
  // prettier-ignore
  constructor(grid: Grid<T>)
  // prettier-ignore
  constructor(partClass: PartConstructor<T>, grid: Grid<any>)
  constructor(
    partClassOrGrid: PartConstructor<T> | Grid<T>,
    gridOrInput:
      | Traverser<T>
      | Array<Traverser<T>>
      | Iterable<T | PartCoordinates>
      | Grid<T> = []
  ) {
    super()
    if (partClassOrGrid instanceof Grid) {
      this.#partClass = partClassOrGrid.#partClass
      this.appened(partClassOrGrid)
    } else {
      this.#partClass = partClassOrGrid
      let input = gridOrInput as
        | Traverser<T>
        | Array<Traverser<T>>
        | Iterable<T | PartCoordinates>
      if (gridOrInput instanceof Grid) {
        switch ((partClassOrGrid as any).type) {
          case PART_TYPE.NODE:
            input = this.#getAllNode(gridOrInput as unknown as Grid<PartClass>)
            break
          case PART_TYPE.EDGE:
            input = this.#getAllEdge(gridOrInput as unknown as Grid<PartClass>)
            break
          case PART_TYPE.VERTEX:
            input = this.#getAllVertex(
              gridOrInput as unknown as Grid<PartClass>
            )
            break
        }
      }
      this.appened(input as never)
    }
  }

  create = ((coordinates?: PartCoordinates, direction?: number): T => {
    return new this.#partClass(coordinates, direction) as T
  }) as Traversable<T>['create']

  #callTraverser(traverser: Traverser<T>): T[] {
    return traverser(
      this.create.bind(this) as Traversable<T>['create'],
      this.last,
      this
    )
  }

  #createsFromIterableOrTraversers(
    input:
      | Traverser<T>
      | Array<Traverser<T>>
      | Iterable<T | PartCoordinates>
      | Grid<T>
  ): Array<T | PartCoordinates> {
    if (typeof input === 'function') {
      return this.#callTraverser(input)
    } else if (Array.isArray(input) && typeof input[0] === 'function') {
      return this.#callTraverser(concat(input))
    } else if (input instanceof Grid) {
      return Array.from(input.values())
    } else {
      return input as Array<T | PartCoordinates>
    }
  }

  appened(
    input:
      | Traverser<T>
      | Array<Traverser<T>>
      | Iterable<T | PartCoordinates>
      | Grid<T>
  ): Grid<T> {
    for (const partOrCoordinates of this.#createsFromIterableOrTraversers(
      input
    )) {
      const part =
        partOrCoordinates instanceof this.#partClass
          ? partOrCoordinates
          : new this.#partClass(partOrCoordinates)
      const found = this.get(part.toString())
      if (found == null) {
        this.set(part.toString(), part as T)
      }
    }
    return this
  }

  traverse(
    traversers: Traverser<T> | Array<Traverser<T>>,
    options?: { bail?: boolean }
  ): Grid<T>
  traverse(
    parts: Iterable<T | PartCoordinates>,
    options?: { bail?: boolean }
  ): Grid<T>
  traverse(grid: Grid<T>, options?: { bail?: boolean }): Grid<T>
  traverse(
    input:
      | Traverser<T>
      | Array<Traverser<T>>
      | Iterable<T | PartCoordinates>
      | Grid<T>,
    { bail = false, reverse = false } = {}
  ): Grid<T> {
    const result = new Grid(this.#partClass)
    const arr = this.#createsFromIterableOrTraversers(input)
    if (reverse) {
      arr.reverse()
    }
    for (const partOrCoordinates of arr) {
      const part =
        partOrCoordinates instanceof this.#partClass
          ? partOrCoordinates
          : new this.#partClass(partOrCoordinates)
      const found = this.get(part.toString())
      if (found != null) {
        result.set(part.toString(), part as T)
      } else if (bail) {
        return this
      }
    }
    return result
  }

  #getAllEdge<U extends PartClass>(grid: Grid<U>): EdgeCoordinates[] {
    const resulthHasDup: EdgeCoordinates[] = []
    switch (grid.type) {
      case PART_TYPE.NODE:
        grid.toArray().forEach((node) => {
          resulthHasDup.push(...(node as NodeClass).borders().values())
        })
        break
      case PART_TYPE.VERTEX:
        grid.toArray().forEach((node) => {
          resulthHasDup.push(...(node as VertexClass).protrudes().values())
        })
        break
      default:
        grid.toArray()
        break
    }
    return resulthHasDup
  }

  #getAllNode<U extends PartClass>(grid: Grid<U>): CubeCoordinates[] {
    const resulthHasDup: CubeCoordinates[] = []
    switch (grid.type) {
      case PART_TYPE.EDGE:
        grid.toArray().forEach((node) => {
          resulthHasDup.push(...(node as EdgeClass).joins().values())
        })
        break
      case PART_TYPE.VERTEX:
        grid.toArray().forEach((node) => {
          resulthHasDup.push(...(node as VertexClass).touches().values())
        })
        break
      default:
        grid.toArray()
        break
    }
    return resulthHasDup
  }

  #getAllVertex<U extends PartClass>(grid: Grid<U>): CubeCoordinates[] {
    const resulthHasDup: CubeCoordinates[] = []
    switch (grid.type) {
      case PART_TYPE.NODE:
        grid.toArray().forEach((node) => {
          resulthHasDup.push(...(node as NodeClass).corners().values())
        })
        break
      case PART_TYPE.EDGE:
        grid.toArray().forEach((node) => {
          resulthHasDup.push(...(node as EdgeClass).endpoints().values())
        })
        break
      default:
        grid.toArray()
        break
    }
    return resulthHasDup
  }

  toArray(): T[] {
    return Array.from(this.values())
  }
}
