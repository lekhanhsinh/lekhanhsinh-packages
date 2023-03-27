import { type DIRECTION } from './constants'

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

export type NodeCoordinates =
  | PointCoordinates
  | OffsetCoordinates
  | Partial<TupleCoordinates>
  | Partial<CubeCoordinates>

export type EdgeCoordinates = CubeCoordinates & { direction: DIRECTION }

export interface Ellipse {
  xRadius: number
  yRadius: number
}

export interface BoundingBox {
  width: number
  height: number
}
