import { type HexagonSettings } from '.'

export * from './Edge'
export * from './Node'
export * from './Vertex'
export * from './createHexagonBoundingBox'
export * from './completeCubeHexagon'
export * from './roundCubeHexagon'
export * from './isHexagon'
export * from './types'

export const defaultHexagonSettings: Required<HexagonSettings> = {
  origin: { x: 0, y: 0 },
  size: { width: 32, height: 32 },
  inverse: { x: false, y: false },
  isPointy: false,
  offset: 1,
}
