import {
  type PointCoordinates,
  type PartSettings,
  type CubeCoordinates,
  type OffsetCoordinates,
  type TupleCoordinates,
  type AddtionOptions,
} from '../types'
import { type EdgeSquare } from './Edge'
import { type NodeSquare } from './Node'
import { type VertexSquare } from './Vertex'

export type SquarePartClass = NodeSquare | EdgeSquare | VertexSquare

export type SquareSettings = Pick<PartSettings, 'size' | 'origin' | 'inverse'>

export type SquareOptions = Omit<Partial<SquareSettings>, 'size' | 'origin'> &
  AddtionOptions

export type PartSquareCoordinates<T extends SquarePartClass> =
  T extends EdgeSquare
    ?
        | Partial<PointCoordinates>
        | Partial<OffsetCoordinates>
        | Partial<TupleCoordinates>
        | Partial<CubeCoordinates>
    : T extends NodeSquare | VertexSquare
    ?
        | Omit<Partial<PointCoordinates>, 'direction'>
        | Omit<Partial<OffsetCoordinates>, 'direction'>
        | Omit<Partial<TupleCoordinates>, 'direction'>
        | Omit<Partial<CubeCoordinates>, 'direction'>
    : never
