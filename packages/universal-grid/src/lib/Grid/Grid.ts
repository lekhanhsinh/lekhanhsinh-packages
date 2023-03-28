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
  constructor(partClass: PartConstructor<T>, parts: Iterable<T | PartCoordinates<T>>)
  // prettier-ignore
  constructor(grid: Grid<T>)
  // prettier-ignore
  constructor(partClass: PartConstructor<T>, grid: Grid<PartClass>)
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
      this.append(partClassOrGrid as never)
    }
  }

  create = ((coordinates?: PartCoordinates<T>, direction?: number): T => {
    return new this.#partClass(coordinates as any, direction) as T
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
        this.set(part.toString(), part as T)
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
        result.set(part.toString(), part as T)
      } else if (bail) {
        return this
      }
    }
    return result
  }

  #getAllEdge(grid: Grid<NodeClass | VertexClass>): EdgeCoordinates[] {
    const resulthHasDup: EdgeCoordinates[] = []
    const arr = grid.toArray()
    switch (grid.type) {
      case PART_TYPE.NODE:
        ;(arr as NodeClass[]).forEach((node) => {
          resulthHasDup.push(...node.borders().values())
        })
        break
      case PART_TYPE.VERTEX:
        ;(arr as VertexClass[]).forEach((node) => {
          resulthHasDup.push(...node.protrudes().values())
        })
        break
    }
    return resulthHasDup
  }

  #getAllNode(grid: Grid<EdgeClass | VertexClass>): CubeCoordinates[] {
    let resulthHasDup: CubeCoordinates[] = []
    const arr = grid.toArray()
    switch (grid.type) {
      case PART_TYPE.EDGE:
        ;(arr as EdgeClass[]).forEach((node) => {
          resulthHasDup.push(...node.joins().values())
        })
        resulthHasDup = resulthHasDup.filter((n) => {
          const borders = Array.from(
            new (this.#partClass as PartConstructor<NodeClass>)(n)
              .borders()
              .values()
          )
          borders.every((b) =>
            (arr as EdgeClass[]).some(
              (e) =>
                b.q === e.q &&
                b.r === e.r &&
                b.s === e.s &&
                b.direction === e.direction
            )
          )
        })
        break
      case PART_TYPE.VERTEX:
        ;(arr as VertexClass[]).forEach((vertex) => {
          resulthHasDup.push(...vertex.touches().values())
        })
        resulthHasDup = resulthHasDup.filter((n) => {
          const corners = Array.from(
            new (this.#partClass as PartConstructor<NodeClass>)(n)
              .corners()
              .values()
          )
          corners.every((b) =>
            (arr as EdgeClass[]).some(
              (e) => b.q === e.q && b.r === e.r && b.s === e.s
            )
          )
        })
        break
    }
    return resulthHasDup
  }

  #getAllVertex(grid: Grid<NodeClass | EdgeClass>): CubeCoordinates[] {
    const resulthHasDup: CubeCoordinates[] = []
    const arr = grid.toArray()
    switch (grid.type) {
      case PART_TYPE.NODE:
        ;(arr as NodeClass[]).forEach((node) => {
          resulthHasDup.push(...node.corners().values())
        })
        break
      case PART_TYPE.EDGE:
        ;(arr as EdgeClass[]).forEach((node) => {
          resulthHasDup.push(...node.endpoints().values())
        })
        break
    }
    return resulthHasDup
  }

  #getAllParts(grid: Grid<PartClass>): (CubeCoordinates | EdgeCoordinates)[] {
    let results: (CubeCoordinates | EdgeCoordinates)[] = []
    switch (grid.type) {
      case PART_TYPE.NODE:
        results = this.#getAllNode(grid as Grid<EdgeClass | VertexClass>)
        break
      case PART_TYPE.EDGE:
        results = this.#getAllEdge(grid as Grid<NodeClass | VertexClass>)
        break
      case PART_TYPE.VERTEX:
        results = this.#getAllVertex(grid as Grid<NodeClass | EdgeClass>)
        break
    }
    return results
  }

  toArray(): T[] {
    return Array.from(this.values())
  }
}
