import { type PartClass } from '../../types'
import { type Traverser } from '../types'

// prettier-ignore
export function concat<T extends PartClass>(traversers: Array<Traverser<T>>): Traverser<T>
// prettier-ignore
export function concat<T extends PartClass>(...traversers: Array<Traverser<T>>): Traverser<T>
export function concat<T extends PartClass>(
  traversers: Traverser<T> | Array<Traverser<T>>,
  ...extras: Array<Traverser<T>>
): Traverser<T> {
  let _traversers = traversers as Array<Traverser<T>>
  if (!Array.isArray(traversers)) {
    _traversers = [traversers].concat(extras)
  }
  return (createNode, cursor, grid): T[] => {
    const nodes: T[] = []
    let _cursor = cursor
    for (const traverser of _traversers) {
      for (const nextCursor of traverser(createNode, _cursor, grid)) {
        _cursor = nextCursor
        nodes.push(_cursor)
      }
    }
    return nodes
  }
}
