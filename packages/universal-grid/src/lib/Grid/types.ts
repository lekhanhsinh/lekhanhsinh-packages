import { type PartClass, type PartCoordinates } from '../types'
import { type Grid } from './Grid'

export type PartConstructor<T extends PartClass> = new (
  coordinates?: PartCoordinates<T>
) => T

export interface Traversable<T extends PartClass> {
  create: (coordinates?: PartCoordinates<T>) => T
  traverse: {
    (
      traversers: Traverser<T>,
      options?: { bail?: boolean; reverse?: boolean }
    ): Grid<T>
    (
      traversers: Array<Traverser<T>>,
      options?: { bail?: boolean; reverse?: boolean }
    ): Grid<T>
    (
      parts: Iterable<T | PartCoordinates<T>>,
      options?: { bail?: boolean; reverse?: boolean }
    ): Grid<T>
    (grid: Grid<T>, options?: { bail?: boolean; reverse?: boolean }): Grid<T>
  }
  append: {
    (traversers: Traverser<T>): Grid<T>
    (traversers: Array<Traverser<T>>): Grid<T>
    (parts: Iterable<T | PartCoordinates<T>>): Grid<T>
    (grid: Grid<T>): Grid<T>
  }
  last?: T
}

export type Traverser<T extends PartClass, R extends Iterable<T> = T[]> = (
  create: Traversable<T>['create'],
  cursor?: T,
  grid?: Grid<T>
) => R
