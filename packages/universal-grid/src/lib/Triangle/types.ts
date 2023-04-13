import {
  type PointCoordinates,
  type PartSettings,
  type CubeCoordinates,
  type OffsetCoordinates,
  type TupleCoordinates,
  type AddtionOptions,
} from '../types'
import { type EdgeTriangle } from './Edge'
import { type NodeTriangle } from './Node'
import { type VertexTriangle } from './Vertex'

export type TrianglePartClass = NodeTriangle | VertexTriangle | EdgeTriangle

export type TriangleSettings = Pick<
  PartSettings,
  'size' | 'origin' | 'inverse' | 'offset'
>

export type TriangleOptions = Omit<
  Partial<TriangleSettings>,
  'size' | 'origin'
> &
  AddtionOptions

export type PartTriangleCoordinates<T extends TrianglePartClass> =
  T extends EdgeTriangle
    ?
        | Partial<PointCoordinates>
        | Partial<OffsetCoordinates>
        | Partial<TupleCoordinates>
        | Partial<CubeCoordinates>
    : T extends NodeTriangle | VertexTriangle
    ?
        | Omit<Partial<PointCoordinates>, 'direction'>
        | Omit<Partial<OffsetCoordinates>, 'direction'>
        | Omit<Partial<TupleCoordinates>, 'direction'>
        | Omit<Partial<CubeCoordinates>, 'direction'>
    : never
