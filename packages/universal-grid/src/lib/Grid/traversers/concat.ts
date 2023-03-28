import { type PartClass, type Traverser } from '../types'

export const concat = <T extends PartClass>(
  traversers: Traverser<T> | Array<Traverser<T>>
): Traverser<T> => {
  if (!Array.isArray(traversers)) {
    return traversers
  }
  return (createNode, cursor, grid): T[] => {
    const nodes: T[] = []
    let _cursor = cursor
    for (const traverser of traversers) {
      for (const nextCursor of traverser(createNode, _cursor, grid)) {
        _cursor = nextCursor
        nodes.push(_cursor)
      }
    }
    return nodes
  }
}
