import { type EdgeClass } from './Edge'
import { type PartClass } from './Grid'
import { type NodeClass } from './Node'
import { type VertexClass } from './Vertex'

export interface PointCoordinates {
  x: number
  y: number
}

export interface OffsetCoordinates {
  col: number
  row: number
}

export interface CubeCoordinates {
  q: number
  r: number
  s: number
}

export type TupleCoordinates = [q: number, r: number, s: number]

export type EdgeCoordinates = CubeCoordinates & { direction: number }

export type PartCoordinates<T extends PartClass> = T extends
  | NodeClass
  | VertexClass
  ?
      | Partial<PointCoordinates>
      | Partial<OffsetCoordinates>
      | Partial<TupleCoordinates>
      | Partial<CubeCoordinates>
  : T extends EdgeClass
  ?
      | Partial<PointCoordinates & { direction: number }>
      | Partial<OffsetCoordinates & { direction: number }>
      | Partial<[q: number, r: number, s: number, direction: number]>
      | Partial<EdgeCoordinates>
  : never

export interface Ellipse {
  xRadius: number
  yRadius: number
}

export interface BoundingBox {
  width: number
  height: number
}
