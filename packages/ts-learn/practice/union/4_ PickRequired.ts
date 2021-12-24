import { RequiredKeys } from "./3_ RequiredKeys"

export default {}

// 保留一个对象中的必须属性
// 
type PickRequired<T> = {
  [K in RequiredKeys<T>]: T[K]
}
type a1 = PickRequired<{ foo: number | undefined, bar?: string, flag: boolean }>
// {foo:number|undefined,flag:boolean}
type a2 = PickRequired<{ foo: number, bar?: string }>
// {foo:number}
type a3 = PickRequired<{ foo: number, flag: boolean }>
// {foo:number,flag:boolean}
type a4 = PickRequired<{ foo?: number, flag?: boolean }>
// {}
type a5 = PickRequired<{}>
// {}