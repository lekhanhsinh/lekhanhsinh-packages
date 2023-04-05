// import {
//   type PartHexagonCoordinates,
//   type HexagonPartClass,
// } from './Hexagon/types'
import {
  type SquarePartClass,
  type PartSquareCoordinates,
} from './Square/types'

export interface PointCoordinates {
  x: number
  y: number
  direction?: number
}

export interface OffsetCoordinates {
  col: number
  row: number
  direction?: number
}

export interface CubeCoordinates {
  q: number
  r: number
  s: number
  direction?: number
}

export type TupleCoordinates = [
  q: number,
  r: number,
  s: number,
  direction?: number
]

// export type PartClass = SquarePartClass | HexagonPartClass

// export type PartCoordinates<T extends PartClass> = T extends SquarePartClass
//   ? PartSquareCoordinates<T>
//   : T extends HexagonPartClass
//   ? PartHexagonCoordinates<T>
//   : never

export type PartClass = SquarePartClass

export type PartCoordinates<T extends PartClass> = T extends SquarePartClass
  ? PartSquareCoordinates<T>
  : never

export interface Ellipse {
  xRadius: number
  yRadius: number
}

export interface BoundingBox {
  width: number
  height: number
}

export interface PartSettings {
  size: BoundingBox
  anchor: PointCoordinates
  offset: 1 | -1
  isPointy: boolean
  inverse: { x: boolean; y: boolean }
}
