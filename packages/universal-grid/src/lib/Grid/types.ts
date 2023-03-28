import { EdgeClass } from '../Edge'
import { NodeClass } from '../Node'
import { VertexClass } from '../Vertex'
import { EdgeCoordinates, type NodeCoordinates } from '../types'
import { type Grid } from './Grid'

export type PartClass = NodeClass | EdgeClass | VertexClass
export type PartCoordinates = NodeCoordinates | EdgeCoordinates
export type PartConstructor<T extends PartClass> = T extends
  | NodeClass
  | VertexClass
  ? new (coordinates?: NodeCoordinates) => T
  : T extends EdgeClass
  ? new (coordinates?: PartCoordinates, direction?: number) => T
  : never

export type Traversable<T extends PartClass> = {
  create: T extends NodeClass | VertexClass
    ? (coordinates?: NodeCoordinates) => T
    : T extends EdgeClass
    ? {
        (coordinates?: EdgeCoordinates): T
        (coordinates?: NodeCoordinates, direction?: number): T
      }
    : never
  last?: T
}

export type Traverser<T extends PartClass, R extends Iterable<T> = T[]> = (
  create: Traversable<T>['create'],
  cursor?: T,
  grid?: Grid<T>
) => R
