import { type PointCoordinates } from '../../types'

export const radiansToVector = (angle: number): PointCoordinates => {
  return { x: Math.cos(angle), y: Math.sin(angle) }
}
