# universal-grid

A library for making grid with vairous built-in tilings, heavily inspired by [Red Blob Games'](http://www.redblobgames.com/grids/hexagons/) and libary [Honeycomb](https://github.com/flauwekeul/honeycomb)

## Installation

NPM:

```bash
npm i @lekhanhsinh/universal-grid
```

## Basic example

```javascript
import { defineSquare, defineEdgeSquare, defineVertexSquare, Grid } from '@lekhanhsinh/universal-grid'

// 1. Create setting
const settings = { size: { width: 50, height: 50} }
// 2. Create a Tile parts class:
const Node = defineSquare(settings)
const Edge = defineEdgeSquare(settings)
const Vertex = defineVertexSquare(settings)

// 3. Create a grid
const gridNode = new Grid(Node, Node.rectangleFilled({ direction: DIRECTION.N, size: { width: 10, height: 10 } }))
const gridEdge = new Grid(Edge, gridNode)
const gridVertex = new Grid(Vertex, gridNode)
```

## Content

### Shape

|          |        Node        |        Edge        |       Vertex       |
|:--------:|:------------------:|:------------------:|:------------------:|
|  Square  | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|  Hexagon | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Triangel |                    |                    |                    |

### Traversers

#### Square

##### Node
* lineWalk
```javascript
    Node.lineWalk({ start: [0, 0, 0], stop: [10, 10, 10] })
    Node.lineWalk({ start: [0, 0, 0], direction: DIRECTION.SE, length: 10 })
```
* ellipseFilled
```javascript
    Node.ellipseFilled({ center: [0, 0, 0], radius: { xRadius: 10, yRadius: 10 } })
    Node.lineWalk({ start: [0, 0, 0], direction: DIRECTION.SE, length: 10 })
```
* rectangleFilled
```javascript
    Node.rectangleFilled({ start: [0, 0, 0], direction: DIRECTION.N, size: { width: 10, height: 10 } })
    Node.rectangleFilled({ center: [0, 0, 0], radius: { xRadius: 10, yRadius: 10 } })
    Node.rectangleFilled({ center: [0, 0, 0], radius: { xRadius: 10, yRadius: 10 }, spiral: true, startDirection: DIRECTION.N, clockwise: true })
```
    
#### Hexagon

##### Node
* lineWalk
```javascript
    Node.lineWalk({ start: [0, 0, 0], stop: [10, 10, 10] })
    Node.lineWalk({ start: [0, 0, 0], direction: DIRECTION.SE, length: 10 })
```
* cirlceOutline
```javascript
    Node.circleOutline({ start: [1, -3, 2], center: [3, -5, 2], clockwise: true })
    Node.circleOutline({ center: [3, -5, 2], radius: 5, clockwise: true })
```
* cirlceFilled
```javascript
    Node.circleFilled({ center: [3, -5, 2], radius: 2})
    Node.circleFilled({ center: [3, -5, 2], radius: 2, spiral: true, startDirection: DIRECTION.N, clockwise: true })
```
* rectangleFilled
```javascript
    Node.rectangleFilled({ start: [0, 0, 0], direction: DIRECTION.N, size: { width: 10, height: 10 } })
    Node.rectangleFilled({ center: [0, 0, 0], radius: { xRadius: 10, yRadius: 10 } })
```