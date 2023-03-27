import { describe, it, expect } from 'vitest'
import { cubeToString } from './cubeToString'
describe('cubeToString', () => {
  it('{ q: 0, r: 0, s: 0 } === "{"q":0,"r":0,"s":0}"', () => {
    expect(cubeToString({ q: 0, r: 0, s: 0 })).toEqual('{"q":0,"r":0,"s":0}')
  })
  it('{ } === "{"q":0,"r":0,"s":0}"', () => {
    expect(cubeToString({})).toEqual('{"q":0,"r":0,"s":0}')
  })
})
