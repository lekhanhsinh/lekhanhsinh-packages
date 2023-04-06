import { type SquareSettings } from './types'
export * from './Edge'
export * from './Node'
export * from './Vertex'
export * from './createSquareBoundingBox'
export * from './types'

export const defaultSquareSettings: Required<SquareSettings> = {
  origin: { x: 0, y: 0 },
  size: { width: 32, height: 32 },
  inverse: { x: false, y: false },
}
