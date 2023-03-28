import {
  type NodeCoordinates,
  type BoundingBox,
  type PointCoordinates,
} from '../types'
import { type Square } from './Square'

export interface NodeSettings {
  size: BoundingBox
  anchor: PointCoordinates
  offset: 1 | -1
  isPointy: boolean
}

export type TriangleSettings = Pick<NodeSettings, 'size' | 'anchor' | 'offset'>
export type SquareSettings = Pick<NodeSettings, 'size' | 'anchor'>
export type HexagonSettings = Pick<
  NodeSettings,
  'size' | 'anchor' | 'offset' | 'isPointy'
>

export type NodeClass = Square
