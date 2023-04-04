import { type PartClass } from '../../types'
import { type Traverser } from '../types'
import { concat } from './concat'

export const repeatWith = <T extends PartClass>(
  sources: Traverser<T> | Array<Traverser<T>>,
  branches: Traverser<T> | Array<Traverser<T>>,
  { includeSource = true } = {}
): Traverser<T> => {
  return (createNode, cursor, grid) => {
    const parts: T[] = []
    for (const sourceCursor of concat<T>(sources as never)(
      createNode,
      cursor,
      grid
    )) {
      if (includeSource) parts.push(sourceCursor)
      for (const part of concat<T>(branches as never)(
        createNode,
        sourceCursor,
        grid
      )) {
        parts.push(part)
      }
    }
    return parts
  }
}
