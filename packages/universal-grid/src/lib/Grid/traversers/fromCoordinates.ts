import { EdgeClass } from '../../Edge'
import { NodeClass } from '../../Node'
import { VertexClass } from '../../Vertex'
import { EdgeCoordinates, type NodeCoordinates } from '../../types'
import { type PartClass, type Traverser } from '../types'

export const fromCoordinates =
  <T extends PartClass>(
    ...coordinates: (T extends VertexClass | NodeClass
      ? NodeCoordinates
      : T extends EdgeClass
      ? EdgeCoordinates
      : never)[]
  ): Traverser<T> =>
  (createNode) =>
    coordinates.map((c) => createNode(c)) as T[]
