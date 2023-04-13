import { type TriangleSettings } from './types'

export * from './Edge'
export * from './Node'
export * from './Vertex'
export * from './createTriangleBoundingBox'
export * from './isTriangle'
export * from './isPointUp'
export * from './roundCubeTriangle'
export * from './types'

export const defaultTriangleSettings: Required<TriangleSettings> = {
  origin: { x: 0, y: 0 },
  size: { width: 32, height: 32 },
  inverse: { x: false, y: false },
  offset: 1,
}
