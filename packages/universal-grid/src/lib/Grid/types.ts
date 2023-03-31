import { type EdgeClass } from '../Edge'
import { type NodeClass } from '../Node'
import { type VertexClass } from '../Vertex'
import { type EdgeCoordinates, type NodeCoordinates } from '../types'
import { type Grid } from './Grid'

export type PartClass = NodeClass | EdgeClass | VertexClass

export type PartCoordinates<T extends PartClass> = T extends
  | NodeClass
  | VertexClass
  ? NodeCoordinates
  : T extends EdgeClass
  ? Partial<EdgeCoordinates>
  : never
export type PartConstructor<T extends PartClass> = T extends
  | NodeClass
  | VertexClass
  ? new (coordinates?: NodeCoordinates) => T
  : T extends EdgeClass
  ? new (coordinates?: PartCoordinates<T>, direction?: number) => T
  : never

export interface Traversable<T extends PartClass> {
  create: T extends NodeClass | VertexClass
    ? (coordinates?: NodeCoordinates) => T
    : T extends EdgeClass
    ? {
        (coordinates?: EdgeCoordinates): T
        (coordinates?: NodeCoordinates, direction?: number): T
      }
    : never
  traverse: {
    (
      traversers: Traverser<T>,
      options?: { bail?: boolean; reverse?: boolean }
    ): Grid<T>
    (
      traversers: Array<Traverser<T>>,
      options?: { bail?: boolean; reverse?: boolean }
    ): Grid<T>
    (
      parts: Iterable<T | PartCoordinates<T>>,
      options?: { bail?: boolean; reverse?: boolean }
    ): Grid<T>
    (grid: Grid<T>, options?: { bail?: boolean; reverse?: boolean }): Grid<T>
  }
  append: {
    (traversers: Traverser<T>): Grid<T>
    (traversers: Array<Traverser<T>>): Grid<T>
    (parts: Iterable<T | PartCoordinates<T>>): Grid<T>
    (grid: Grid<T>): Grid<T>
  }
  last?: T
}

export type Traverser<T extends PartClass, R extends Iterable<T> = T[]> = (
  create: Traversable<T>['create'],
  cursor?: T,
  grid?: Grid<T>
) => R
