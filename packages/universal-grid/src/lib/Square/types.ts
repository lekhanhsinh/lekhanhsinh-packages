import {
  type Ellipse,
  type BoundingBox,
  type PointCoordinates,
  type PartSettings,
  type CubeCoordinates,
  type OffsetCoordinates,
  type TupleCoordinates,
} from '../types'
import { type EdgeSquare } from './Edge'
import { type NodeSquare } from './Node'
import { type VertexSquare } from './Vertex'

export type SquarePartClass = NodeSquare | EdgeSquare | VertexSquare

export type SquareSettings = Pick<PartSettings, 'size' | 'anchor' | 'inverse'>

export type SquareOptions = Omit<Partial<SquareSettings>, 'size'> & {
  size?: number | Ellipse | BoundingBox
}

export type PartSquareCoordinates<T extends SquarePartClass> =
  T extends EdgeSquare
    ?
        | Partial<PointCoordinates>
        | Partial<OffsetCoordinates>
        | Partial<TupleCoordinates>
        | Partial<CubeCoordinates>
    : T extends NodeSquare | VertexSquare
    ?
        | Omit<PointCoordinates, 'direction'>
        | Omit<OffsetCoordinates, 'direction'>
        | Omit<TupleCoordinates, 'direction'>
        | Omit<CubeCoordinates, 'direction'>
    : never
