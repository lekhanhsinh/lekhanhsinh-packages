import { describe, it, expect } from 'vitest'
import { VertexSquare } from './Square'
import {
  type PointCoordinates,
  type CubeCoordinates,
  type OffsetCoordinates,
  type EdgeCoordinates,
} from '../../types'
import { type SquareSettings, defaultSquareSettings } from '../../Node'
import { DIRECTION } from '../../constants'

describe('VertexSquare', () => {
  it('create instance', () => {
    expect(new VertexSquare()).toContain<CubeCoordinates>({ q: 0, r: 0, s: 0 })
    expect(new VertexSquare({ q: 1, r: 4, s: 0 })).toContain<CubeCoordinates>({
      q: 1,
      r: 4,
      s: 0,
    })
    expect(new VertexSquare({ col: 1, row: 2 })).toContain<CubeCoordinates>({
      q: 1,
      r: 2,
      s: 0,
    })
    expect(new VertexSquare([3, 4, 0])).toContain<CubeCoordinates>({
      q: 3,
      r: 4,
      s: 0,
    })
    expect(new VertexSquare({ x: 64, y: 64 })).toContain<CubeCoordinates>({
      q: 2,
      r: 2,
      s: 0,
    })
  })

  it('class has static default setting', () => {
    expect(VertexSquare.settings).toEqual<SquareSettings>(defaultSquareSettings)
  })

  it('instance contain SquareSettings', () => {
    const vertex = new VertexSquare([3, 4, 0])
    expect(vertex).toContain<SquareSettings>(defaultSquareSettings)
  })

  it('instance contain center pixel point', () => {
    const vertex = new VertexSquare([3, 4, 0])
    expect(vertex.center).toEqual<PointCoordinates>({ x: 96, y: 128 })
  })

  it('instance contain OffsetCoordinates', () => {
    const vertex = new VertexSquare([3, 4, 0])
    expect(vertex).toContain<OffsetCoordinates>({ col: 3, row: 4 })
  })

  it('instance contain touche relation with Node', () => {
    const vertex = new VertexSquare([10, 10, 0])
    const results = new Map([
      [DIRECTION.NE, { q: 10, r: 11, s: 0 }],
      [DIRECTION.SE, { q: 10, r: 10, s: 0 }],
      [DIRECTION.SW, { q: 9, r: 10, s: 0 }],
      [DIRECTION.NW, { q: 9, r: 11, s: 0 }],
    ])
    expect(vertex.touche(DIRECTION.NE)).toEqual<CubeCoordinates | undefined>(
      results.get(DIRECTION.NE)
    )
    expect(vertex.touche(DIRECTION.SE)).toEqual<CubeCoordinates | undefined>(
      results.get(DIRECTION.SE)
    )
    expect(vertex.touche(DIRECTION.SW)).toEqual<CubeCoordinates | undefined>(
      results.get(DIRECTION.SW)
    )
    expect(vertex.touche(DIRECTION.NW)).toEqual<CubeCoordinates | undefined>(
      results.get(DIRECTION.NW)
    )
    expect(vertex.touches()).toEqual(results)
  })

  it('instance contain protrude relation with Edge', () => {
    const vertex = new VertexSquare([10, 10, 0])
    const results = new Map([
      [DIRECTION.N, { q: 10, r: 11, s: 0, direction: DIRECTION.W }],
      [DIRECTION.E, { q: 10, r: 10, s: 0, direction: DIRECTION.N }],
      [DIRECTION.S, { q: 10, r: 10, s: 0, direction: DIRECTION.W }],
      [DIRECTION.W, { q: 9, r: 10, s: 0, direction: DIRECTION.N }],
    ])
    expect(vertex.protrude(DIRECTION.N)).toEqual<EdgeCoordinates | undefined>(
      results.get(DIRECTION.N)
    )
    expect(vertex.protrude(DIRECTION.E)).toEqual<EdgeCoordinates | undefined>(
      results.get(DIRECTION.E)
    )
    expect(vertex.protrude(DIRECTION.S)).toEqual<EdgeCoordinates | undefined>(
      results.get(DIRECTION.S)
    )
    expect(vertex.protrude(DIRECTION.W)).toEqual<EdgeCoordinates | undefined>(
      results.get(DIRECTION.W)
    )
    expect(vertex.protrudes()).toEqual(results)
  })

  it('instance contain adjacent relation with Vertex', () => {
    const vertex = new VertexSquare([10, 10, 0])
    const results = new Map([
      [DIRECTION.N, { q: 10, r: 11, s: 0 }],
      [DIRECTION.E, { q: 11, r: 10, s: 0 }],
      [DIRECTION.S, { q: 10, r: 9, s: 0 }],
      [DIRECTION.W, { q: 9, r: 10, s: 0 }],
    ])
    expect(vertex.adjacent(DIRECTION.N)).toEqual<CubeCoordinates | undefined>(
      results.get(DIRECTION.N)
    )
    expect(vertex.adjacent(DIRECTION.E)).toEqual<CubeCoordinates | undefined>(
      results.get(DIRECTION.E)
    )
    expect(vertex.adjacent(DIRECTION.S)).toEqual<CubeCoordinates | undefined>(
      results.get(DIRECTION.S)
    )
    expect(vertex.adjacent(DIRECTION.W)).toEqual<CubeCoordinates | undefined>(
      results.get(DIRECTION.W)
    )
    expect(vertex.adjacents()).toEqual(results)
  })
})
