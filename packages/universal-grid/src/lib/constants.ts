export const SQRT3 = Math.sqrt(3)
export const SQRT3_2 = Math.sqrt(3) / 2

export enum PART_TYPE {
  NODE = 'Node',
  VERTEX = 'Vertex',
  EDGE = 'Edge',
}

export enum SHAPE {
  TRIANGLE = 3,
  SQUARE = 4,
  HEXAGON = 6,
}

export enum DIRECTION {
  E = 0,
  NE = (1 / 4) * Math.PI,
  N = (1 / 2) * Math.PI,
  NW = (3 / 4) * Math.PI,
  W = Math.PI,
  SW = (5 / 4) * Math.PI,
  S = (3 / 2) * Math.PI,
  SE = (7 / 4) * Math.PI,
}
