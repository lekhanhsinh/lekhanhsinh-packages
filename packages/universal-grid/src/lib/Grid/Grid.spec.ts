import { describe, it, expect, vi } from 'vitest'
import { Grid } from './Grid'
import { type NodeClass, defineSquare } from '../Node'
import { type EdgeClass, defineEdgeSquare } from '../Edge'
import { type VertexClass, defineVertexSquare } from '../Vertex'
import { DIRECTION, PART_TYPE } from '../constants'
import { type Traverser } from './types'

describe('Grid', () => {
  it('create instance', () => {
    const Node = defineSquare()
    expect(new Grid(Node)).toBeInstanceOf(Grid)
    expect(
      new Grid(Node, [
        [1, 1, 0],
        [2, 2, 0],
      ]).size
    ).toEqual(2)
    expect(
      new Grid(Node, [
        Grid.fromCoordinates([1, 1, 0]),
        Grid.fromCoordinates([2, 2, 0]),
        Grid.fromCoordinates([3, 3, 0]),
      ]).size
    ).toEqual(3)
  })

  it('create instance from Grid', () => {
    const Node = defineSquare()
    const grid = new Grid(Node)
    expect(new Grid(grid)).toBeInstanceOf(Grid)
    expect(new Grid(grid)).not.toBe(grid)
  })

  it('create instance from Node Grid with other class', () => {
    const Node = defineSquare()
    const Edge = defineEdgeSquare()
    const Vertex = defineVertexSquare()
    const grid = new Grid(Node, [[1, 1, 0]])
    expect(new Grid(Edge, grid)).toBeInstanceOf(Grid)
    expect(new Grid(Edge, grid)).not.toBe(grid)
    expect(new Grid(Edge, grid).type).toEqual(PART_TYPE.EDGE)
    expect(new Grid(Edge, grid).size).toEqual(4)

    expect(new Grid(Vertex, grid)).toBeInstanceOf(Grid)
    expect(new Grid(Vertex, grid)).not.toBe(grid)
    expect(new Grid(Vertex, grid).type).toEqual(PART_TYPE.VERTEX)
    expect(new Grid(Vertex, grid).size).toEqual(4)
  })

  it('create a part instance from Grid.create', () => {
    const Node = defineSquare()
    const Edge = defineEdgeSquare()
    const Vertex = defineVertexSquare()
    expect(new Grid(Node).create()).toBeInstanceOf(Node)
    expect(new Grid(Edge).create()).toBeInstanceOf(Edge)
    expect(new Grid(Vertex).create()).toBeInstanceOf(Vertex)
  })

  it('append to a instance of Grid', () => {
    const Node = defineSquare()
    const Edge = defineEdgeSquare()
    const Vertex = defineVertexSquare()
    const gridNode = new Grid(Node)
    const gridEdge = new Grid(Edge)
    const gridVertex = new Grid(Vertex)
    expect(gridNode.append([[1, 1, 0]]).size).toEqual(1)
    expect(
      gridEdge.append(
        Grid.fromCoordinates({ q: 1, r: 1, s: 0, direction: DIRECTION.N })
      ).size
    ).toEqual(1)
    expect(gridVertex.append([[1, 1, 0]]).size).toEqual(1)
  })

  it('traverse through a instance of Grid', () => {
    const Node = defineSquare()
    const Edge = defineEdgeSquare()
    const Vertex = defineVertexSquare()
    const gridNode = new Grid(Node, [
      [1, 1, 0],
      [1, 2, 0],
      [2, 2, 0],
      [2, 1, 0],
    ])
    const gridEdge = new Grid(Edge, [
      [1, 1, 0, DIRECTION.N],
      [1, 2, 0, DIRECTION.N],
      [2, 2, 0, DIRECTION.N],
      [2, 1, 0, DIRECTION.N],
    ])
    const gridVertex = new Grid(Vertex, [
      [1, 1, 0],
      [1, 2, 0],
      [2, 2, 0],
      [2, 1, 0],
    ])
    const traverser = Grid.fromCoordinates(
      [5, 1, 0],
      [1, 2, 0],
      [3, 2, 0],
      [2, 1, 0]
    )
    const getNode = vi.spyOn(gridNode, 'get')
    const getEdge = vi.spyOn(gridEdge, 'get')
    const getVertex = vi.spyOn(gridVertex, 'get')
    expect(gridNode.traverse(traverser as Traverser<NodeClass>)).not.toBe(
      gridNode
    )
    expect(getNode).toBeCalledTimes(4)

    expect(
      gridEdge.traverse(traverser as Traverser<EdgeClass>, { bail: true })
    ).not.toBe(gridEdge)
    expect(getEdge).toBeCalledTimes(1)

    expect(
      gridVertex.traverse(traverser as Traverser<VertexClass>, {
        reverse: true,
        bail: true,
      })
    ).not.toBe(gridVertex)
    expect(getVertex).toBeCalledTimes(2)
  })

  it('convert a instance of Grid to Array using toArray()', () => {
    const Node = defineSquare()
    expect(new Grid(Node).toArray()).toBeInstanceOf(Array)
  })
})
