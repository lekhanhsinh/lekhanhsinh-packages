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

export const PART_RELATION = new Map<string, string>([
  [`${PART_TYPE.NODE},${PART_TYPE.NODE}`, 'neighbors'],
  [`${PART_TYPE.NODE},${PART_TYPE.EDGE}`, 'borders'],
  [`${PART_TYPE.NODE},${PART_TYPE.VERTEX}`, 'corners'],
  [`${PART_TYPE.EDGE},${PART_TYPE.EDGE}`, 'continues'],
  [`${PART_TYPE.EDGE},${PART_TYPE.NODE}`, 'joins'],
  [`${PART_TYPE.EDGE},${PART_TYPE.VERTEX}`, 'endpoints'],
  [`${PART_TYPE.VERTEX},${PART_TYPE.VERTEX}`, 'adjacents'],
  [`${PART_TYPE.VERTEX},${PART_TYPE.NODE}`, 'touches'],
  [`${PART_TYPE.VERTEX},${PART_TYPE.EDGE}`, 'protrudes'],
])
