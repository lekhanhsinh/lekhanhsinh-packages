import { type Traverser, type PartClass } from '../types'
import { concat } from './concat'

export const repeat = <T extends PartClass>(
  times: number,
  traversers: Traverser<T> | Array<Traverser<T>>
): Traverser<T> => {
  return concat(Array.from({ length: times }, () => concat(traversers)))
}
