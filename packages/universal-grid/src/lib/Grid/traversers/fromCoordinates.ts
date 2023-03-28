import { PartCoordinates, type PartClass, type Traverser } from '../types'

// prettier-ignore
export function fromCoordinates<T extends PartClass>(coordinates: Array<PartCoordinates<T>>): Traverser<T>
// prettier-ignore
export function fromCoordinates<T extends PartClass>(...coordinates: Array<PartCoordinates<T>>): Traverser<T>
export function fromCoordinates<T extends PartClass>(
  coordinates: PartCoordinates<T> | Array<PartCoordinates<T>>,
  ...extras: Array<PartCoordinates<T>>
): Traverser<T> {
  return (createNode) => {
    let _coordinates = coordinates as Array<PartCoordinates<T>>
    if (!Array.isArray(coordinates)) {
      _coordinates = [coordinates].concat(extras)
    }
    return _coordinates.map((c) => createNode(c)) as T[]
  }
}
