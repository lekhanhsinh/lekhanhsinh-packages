import { type Traverser, type PartClass } from '../types'
import { concat } from './concat'

// prettier-ignore
export function repeat<T extends PartClass>(times: number, traversers: Traverser<T>): Traverser<T>
// prettier-ignore
export function repeat<T extends PartClass>(times: number, traversers: Array<Traverser<T>>): Traverser<T>
export function repeat<T extends PartClass>(
  times: number,
  traversers: Traverser<T> | Array<Traverser<T>>
): Traverser<T> {
  return concat<T>(
    Array.from({ length: times }, () => concat<T>(traversers as never))
  )
}
