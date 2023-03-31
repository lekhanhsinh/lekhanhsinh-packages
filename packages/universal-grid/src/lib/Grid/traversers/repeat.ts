import { type Traverser, type PartClass } from '../types'
import { concat } from './concat'

// prettier-ignore
export function repeat<T extends PartClass>(traversers: Traverser<T>, times: number): Traverser<T>
// prettier-ignore
export function repeat<T extends PartClass>(traversers: Array<Traverser<T>>, times: number): Traverser<T>
export function repeat<T extends PartClass>(
  traversers: Traverser<T> | Array<Traverser<T>>,
  times: number
): Traverser<T> {
  return concat<T>(
    Array.from({ length: times }, () => concat<T>(traversers as never))
  )
}
