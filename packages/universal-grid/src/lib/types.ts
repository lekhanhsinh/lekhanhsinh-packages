import {
  type PartHexagonCoordinates,
  type HexagonPartClass,
} from './Hexagon/types'
import {
  type SquarePartClass,
  type PartSquareCoordinates,
} from './Square/types'
import {
  type PartTriangleCoordinates,
  type TrianglePartClass,
} from './Triangle/types'

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

export type PartClass = SquarePartClass | HexagonPartClass | TrianglePartClass

export type PartCoordinates<T extends PartClass> = T extends SquarePartClass
  ? PartSquareCoordinates<T>
  : T extends HexagonPartClass
  ? PartHexagonCoordinates<T>
  : T extends TrianglePartClass
  ? PartTriangleCoordinates<T>
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
  origin: Omit<PointCoordinates, 'direction'>
  offset: 1 | -1
  isPointy: boolean
  inverse: { x: boolean; y: boolean }
}

export interface AddtionOptions {
  size?: number | Ellipse | BoundingBox
  origin?:
    | 'top-left'
    | 'bottom-left'
    | 'top-right'
    | 'bottom-right'
    | Omit<PointCoordinates, 'direction'>
    | Ellipse
}
