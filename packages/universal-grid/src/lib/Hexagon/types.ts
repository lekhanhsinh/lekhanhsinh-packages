import {
  type PartSettings,
  type PointCoordinates,
  type OffsetCoordinates,
  type TupleCoordinates,
  type CubeCoordinates,
  type AddtionOptions,
} from '../types'
import { type EdgeHexagon } from './Edge/EdgeHexagon'
import { type NodeHexagon } from './Node/NodeHexagon'
import { type VertexHexagon } from './Vertex/VertexHexagon'

export type HexagonPartClass = NodeHexagon | EdgeHexagon | VertexHexagon

export type HexagonSettings = Pick<
  PartSettings,
  'size' | 'origin' | 'offset' | 'isPointy' | 'inverse'
>

export type HexagonOptions = Omit<Partial<HexagonSettings>, 'size' | 'origin'> &
  AddtionOptions

export type PartHexagonCoordinates<T extends HexagonPartClass> = T extends
  | EdgeHexagon
  | VertexHexagon
  ?
      | Partial<PointCoordinates>
      | Partial<OffsetCoordinates>
      | Partial<TupleCoordinates>
      | Partial<CubeCoordinates>
  : T extends NodeHexagon
  ?
      | Omit<Partial<PointCoordinates>, 'direction'>
      | Omit<Partial<OffsetCoordinates>, 'direction'>
      | Omit<Partial<TupleCoordinates>, 'direction'>
      | Omit<Partial<CubeCoordinates>, 'direction'>
  : never
