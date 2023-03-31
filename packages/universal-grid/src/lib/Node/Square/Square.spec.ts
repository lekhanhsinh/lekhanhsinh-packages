import { describe, it, expect } from 'vitest'
import { Square } from './Square'
import {
  type PointCoordinates,
  type CubeCoordinates,
  type OffsetCoordinates,
  type EdgeCoordinates,
} from '../../types'
import { type SquareSettings, defaultSquareSettings } from '../../Node'
import { DIRECTION } from '../../constants'

describe('Square', () => {
  it('create instance', () => {
    expect(new Square()).toContain<CubeCoordinates>({ q: 0, r: 0, s: 0 })
    expect(new Square({ col: 1, row: 2 })).toContain<CubeCoordinates>({
      q: 1,
      r: 2,
      s: 0,
    })
    expect(new Square([3, 4, 0])).toContain<CubeCoordinates>({
      q: 3,
      r: 4,
      s: 0,
    })
    expect(new Square({ x: 64, y: 64 })).toContain<CubeCoordinates>({
      q: 1,
      r: 1,
      s: 0,
    })
  })

  it('class has static default setting', () => {
    expect(Square.settings).toEqual<SquareSettings>(defaultSquareSettings)
  })

  it('instance contain SquareSettings', () => {
    const node = new Square([3, 4, 0])
    expect(node).toContain<SquareSettings>(defaultSquareSettings)
  })

  it('instance contain center pixel point', () => {
    const node = new Square([3, 4, 0])
    expect(node.center).toEqual<PointCoordinates>({ x: 112, y: 144 })
  })

  it('instance contain OffsetCoordinates', () => {
    const node = new Square([3, 4, 0])
    expect(node).toContain<OffsetCoordinates>({ col: 3, row: 4 })
  })

  it('instance contain neighbor relation with Node', () => {
    const node = new Square([10, 10, 0])
    const results = new Map([
      [DIRECTION.N, { q: 10, r: 11, s: 0 }],
      [DIRECTION.E, { q: 11, r: 10, s: 0 }],
      [DIRECTION.S, { q: 10, r: 9, s: 0 }],
      [DIRECTION.W, { q: 9, r: 10, s: 0 }],
    ])
    expect(node.neighbor(DIRECTION.N)).toEqual<CubeCoordinates | undefined>(
      results.get(DIRECTION.N)
    )
    expect(node.neighbor(DIRECTION.E)).toEqual<CubeCoordinates | undefined>(
      results.get(DIRECTION.E)
    )
    expect(node.neighbor(DIRECTION.S)).toEqual<CubeCoordinates | undefined>(
      results.get(DIRECTION.S)
    )
    expect(node.neighbor(DIRECTION.W)).toEqual<CubeCoordinates | undefined>(
      results.get(DIRECTION.W)
    )
    expect(node.neighbors()).toEqual(results)
  })

  it('instance contain border relation with Edge', () => {
    const node = new Square([10, 10, 0])
    const results = new Map([
      [DIRECTION.N, { q: 10, r: 10, s: 0, direction: DIRECTION.N }],
      [DIRECTION.E, { q: 11, r: 10, s: 0, direction: DIRECTION.W }],
      [DIRECTION.S, { q: 10, r: 9, s: 0, direction: DIRECTION.N }],
      [DIRECTION.W, { q: 10, r: 10, s: 0, direction: DIRECTION.W }],
    ])
    expect(node.border(DIRECTION.N)).toEqual<EdgeCoordinates | undefined>(
      results.get(DIRECTION.N)
    )
    expect(node.border(DIRECTION.E)).toEqual<EdgeCoordinates | undefined>(
      results.get(DIRECTION.E)
    )
    expect(node.border(DIRECTION.S)).toEqual<EdgeCoordinates | undefined>(
      results.get(DIRECTION.S)
    )
    expect(node.border(DIRECTION.W)).toEqual<EdgeCoordinates | undefined>(
      results.get(DIRECTION.W)
    )
    expect(node.borders()).toEqual(results)
  })

  it('instance contain corner relation with Vertex', () => {
    const node = new Square([10, 10, 0])
    const results = new Map([
      [DIRECTION.NW, { q: 10, r: 10, s: 0 }],
      [DIRECTION.NE, { q: 11, r: 10, s: 0 }],
      [DIRECTION.SE, { q: 11, r: 9, s: 0 }],
      [DIRECTION.SW, { q: 10, r: 9, s: 0 }],
    ])
    expect(node.corner(DIRECTION.NW)).toEqual<CubeCoordinates | undefined>(
      results.get(DIRECTION.NW)
    )
    expect(node.corner(DIRECTION.NE)).toEqual<CubeCoordinates | undefined>(
      results.get(DIRECTION.NE)
    )
    expect(node.corner(DIRECTION.SE)).toEqual<CubeCoordinates | undefined>(
      results.get(DIRECTION.SE)
    )
    expect(node.corner(DIRECTION.SW)).toEqual<CubeCoordinates | undefined>(
      results.get(DIRECTION.SW)
    )
    expect(node.corners()).toEqual(results)
  })
})
