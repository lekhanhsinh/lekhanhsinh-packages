import { type BoundingBox, type PointCoordinates } from '../types'
import { type Square } from './Square'

export interface NodeSettings {
  size: BoundingBox
  anchor: PointCoordinates
  offset: 1 | -1
  isPointy: boolean
  inverse: { x: boolean; y: boolean }
}

export type TriangleSettings = Pick<
  NodeSettings,
  'size' | 'anchor' | 'offset' | 'inverse'
>
export type SquareSettings = Pick<NodeSettings, 'size' | 'anchor' | 'inverse'>
export type HexagonSettings = Pick<
  NodeSettings,
  'size' | 'anchor' | 'offset' | 'isPointy' | 'inverse'
>

export type NodeClass = Square
