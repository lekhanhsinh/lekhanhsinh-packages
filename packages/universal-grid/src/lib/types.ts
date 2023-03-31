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
  ? PointCoordinates | OffsetCoordinates | TupleCoordinates | CubeCoordinates
  : T extends EdgeClass
  ?
      | (PointCoordinates & { direction: number })
      | (OffsetCoordinates & { direction: number })
      | [q: number, r: number, s: number, direction: number]
      | EdgeCoordinates
  : never

export interface Ellipse {
  xRadius: number
  yRadius: number
}

export interface BoundingBox {
  width: number
  height: number
}
