import { describe, it, expect } from 'vitest'
import { EdgeSquare } from './EdgeSquare'
import {
  type PointCoordinates,
  type CubeCoordinates,
  type OffsetCoordinates,
} from '../../types'
import { DIRECTION } from '../../constants'
import { type SquareSettings } from '../types'
import { defaultSquareSettings } from '..'

describe('EdgeSquare', () => {
  it('create instance', () => {
    expect(new EdgeSquare()).toContain<CubeCoordinates>({
      q: 0,
      r: 0,
      s: 0,
      direction: DIRECTION.N,
    })
    expect(
      new EdgeSquare({ q: 1, r: 4, s: 0, direction: DIRECTION.N })
    ).toContain<CubeCoordinates>({
      q: 1,
      r: 4,
      s: 0,
      direction: DIRECTION.N,
    })
    expect(
      new EdgeSquare({ col: 1, row: 2, direction: DIRECTION.N })
    ).toContain<CubeCoordinates>({
      q: 1,
      r: 2,
      s: 0,
      direction: DIRECTION.N,
    })
    expect(new EdgeSquare([3, 4, 0, DIRECTION.W])).toContain<CubeCoordinates>({
      q: 3,
      r: 4,
      s: 0,
      direction: DIRECTION.W,
    })
    expect(
      new EdgeSquare({ x: 64, y: 64, direction: DIRECTION.N })
    ).toContain<CubeCoordinates>({
      q: 2,
      r: 2,
      s: 0,
      direction: DIRECTION.N,
    })
  })

  it('class has static default setting', () => {
    expect(EdgeSquare.settings).toEqual<SquareSettings>(defaultSquareSettings)
  })

  it('instance contain SquareSettings', () => {
    const edge = new EdgeSquare([3, 4, 0, DIRECTION.N])
    expect(edge).toContain<SquareSettings>(defaultSquareSettings)
  })

  it('instance contain center pixel point', () => {
    const edge = new EdgeSquare([3, 4, 0, DIRECTION.N])
    expect(edge.center).toEqual<PointCoordinates>({ x: 96, y: 144 })
  })

  it('instance contain OffsetCoordinates', () => {
    const edge = new EdgeSquare([3, 4, 0, DIRECTION.W])
    expect(edge).toContain<OffsetCoordinates>({ col: 3, row: 4 })
  })

  it('instance contain continue relation with Edge', () => {
    const edgeW = new EdgeSquare([10, 10, 0, DIRECTION.W])
    const edgeN = new EdgeSquare([10, 10, 0, DIRECTION.N])
    const resultsW = new Map([
      [DIRECTION.N, { q: 10, r: 11, s: 0, direction: DIRECTION.W }],
      [DIRECTION.S, { q: 10, r: 9, s: 0, direction: DIRECTION.W }],
    ])
    const resultsN = new Map([
      [DIRECTION.E, { q: 11, r: 10, s: 0, direction: DIRECTION.N }],
      [DIRECTION.W, { q: 9, r: 10, s: 0, direction: DIRECTION.N }],
    ])
    expect(edgeW.continue(DIRECTION.N)).toEqual<CubeCoordinates | undefined>(
      resultsW.get(DIRECTION.N)
    )
    expect(edgeW.continue(DIRECTION.S)).toEqual<CubeCoordinates | undefined>(
      resultsW.get(DIRECTION.S)
    )
    expect(edgeW.continue(DIRECTION.W)).toEqual<CubeCoordinates | undefined>(
      undefined
    )
    expect(edgeW.continue(DIRECTION.E)).toEqual<CubeCoordinates | undefined>(
      undefined
    )
    expect(edgeN.continue(DIRECTION.E)).toEqual<CubeCoordinates | undefined>(
      resultsN.get(DIRECTION.E)
    )
    expect(edgeN.continue(DIRECTION.W)).toEqual<CubeCoordinates | undefined>(
      resultsN.get(DIRECTION.W)
    )
    expect(edgeN.continue(DIRECTION.N)).toEqual<CubeCoordinates | undefined>(
      undefined
    )
    expect(edgeN.continue(DIRECTION.S)).toEqual<CubeCoordinates | undefined>(
      undefined
    )
    expect(edgeW.continues()).toEqual(resultsW)
    expect(edgeN.continues()).toEqual(resultsN)
  })

  it('instance contain join relation with Node', () => {
    const edgeW = new EdgeSquare([10, 10, 0, DIRECTION.W])
    const edgeN = new EdgeSquare([10, 10, 0, DIRECTION.N])
    const resultsW = new Map([
      [DIRECTION.E, { q: 9, r: 10, s: 0 }],
      [DIRECTION.W, { q: 10, r: 10, s: 0 }],
    ])
    const resultsN = new Map([
      [DIRECTION.N, { q: 10, r: 11, s: 0 }],
      [DIRECTION.S, { q: 10, r: 10, s: 0 }],
    ])
    expect(edgeW.join(DIRECTION.N)).toEqual<CubeCoordinates | undefined>(
      undefined
    )
    expect(edgeW.join(DIRECTION.S)).toEqual<CubeCoordinates | undefined>(
      undefined
    )
    expect(edgeW.join(DIRECTION.W)).toEqual<CubeCoordinates | undefined>(
      resultsW.get(DIRECTION.W)
    )
    expect(edgeW.join(DIRECTION.E)).toEqual<CubeCoordinates | undefined>(
      resultsW.get(DIRECTION.E)
    )
    expect(edgeN.join(DIRECTION.E)).toEqual<CubeCoordinates | undefined>(
      undefined
    )
    expect(edgeN.join(DIRECTION.W)).toEqual<CubeCoordinates | undefined>(
      undefined
    )
    expect(edgeN.join(DIRECTION.N)).toEqual<CubeCoordinates | undefined>(
      resultsN.get(DIRECTION.N)
    )
    expect(edgeN.join(DIRECTION.S)).toEqual<CubeCoordinates | undefined>(
      resultsN.get(DIRECTION.S)
    )
    expect(edgeW.joins()).toEqual(resultsW)
    expect(edgeN.joins()).toEqual(resultsN)
  })

  it('instance contain endpoint relation with Vertex', () => {
    const edgeW = new EdgeSquare([10, 10, 0, DIRECTION.W])
    const edgeN = new EdgeSquare([10, 10, 0, DIRECTION.N])
    const resultsW = new Map([
      [DIRECTION.N, { q: 10, r: 10, s: 0 }],
      [DIRECTION.S, { q: 10, r: 9, s: 0 }],
    ])
    const resultsN = new Map([
      [DIRECTION.E, { q: 11, r: 10, s: 0 }],
      [DIRECTION.W, { q: 10, r: 10, s: 0 }],
    ])
    expect(edgeW.endpoint(DIRECTION.N)).toEqual<CubeCoordinates | undefined>(
      resultsW.get(DIRECTION.N)
    )
    expect(edgeW.endpoint(DIRECTION.S)).toEqual<CubeCoordinates | undefined>(
      resultsW.get(DIRECTION.S)
    )
    expect(edgeW.endpoint(DIRECTION.W)).toEqual<CubeCoordinates | undefined>(
      undefined
    )
    expect(edgeW.endpoint(DIRECTION.E)).toEqual<CubeCoordinates | undefined>(
      undefined
    )
    expect(edgeN.endpoint(DIRECTION.E)).toEqual<CubeCoordinates | undefined>(
      resultsN.get(DIRECTION.E)
    )
    expect(edgeN.endpoint(DIRECTION.W)).toEqual<CubeCoordinates | undefined>(
      resultsN.get(DIRECTION.W)
    )
    expect(edgeN.endpoint(DIRECTION.N)).toEqual<CubeCoordinates | undefined>(
      undefined
    )
    expect(edgeN.endpoint(DIRECTION.S)).toEqual<CubeCoordinates | undefined>(
      undefined
    )
    expect(edgeW.endpoints()).toEqual(resultsW)
    expect(edgeN.endpoints()).toEqual(resultsN)
  })
})
