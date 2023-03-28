import { type Traverser, type PartClass } from '../types'
import { concat } from './concat'

export const repeatWith = <T extends PartClass>(
  sources: Traverser<T> | Array<Traverser<T>>,
  branches: Traverser<T> | Array<Traverser<T>>,
  { includeSource = true } = {}
): Traverser<T> => {
  return (createNode, cursor, grid) => {
    const nodes: T[] = []

    for (const sourceCursor of concat(sources)(createNode, cursor, grid)) {
      if (includeSource) nodes.push(sourceCursor)
      for (const node of concat(branches)(createNode, sourceCursor, grid)) {
        nodes.push(node)
      }
    }

    return nodes
  }
}
