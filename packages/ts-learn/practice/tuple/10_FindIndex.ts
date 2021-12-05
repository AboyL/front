export default {}
// 找出E类型在元组类型T中的下标

// 依旧是使用元组做长度判断
// 需要有一个减法操作
// type IndexLast<T>=T extends 
// 重要的是对概念的表达
// 怎么表达非? 怎么进行全等于？
// any extends any 都是true
// [any] extends [任意类型] 都是true

type A1=keyof any
// type A1 = string | number | symbol
type A2=keyof number
// type A1 = "toString" | "toFixed" | "toExponential" | "toPrecision" | "valueOf" | "toLocaleString"
type A3=keyof undefined
// type A3 = never
type A4=keyof null
// type A3 = never
type A5=keyof never
// type A5 = string | number | symbol


type Equal<T, K> = [T] extends [K] ? [K] extends [T] ? (keyof T extends keyof K ? keyof K extends keyof T ? true : false : false) : false : false;

export type FindIndex<T, N, Pre extends any[] = []> =
  T extends [infer L, ...infer R] ?
  // [L] extends [N] ? PrePre['length'] : FindIndex<R, N, [...Pre, L], Pre>
  Equal<L,N> extends true ? Pre['length'] : FindIndex<R, N, [...Pre, L]>
  : never

type A = [any, never, 1, '2', true]
type B = FindIndex<A, 1> // 2
type C = FindIndex<A, 3> // never
type D = FindIndex<A, '2'> // 3
type E = FindIndex<A, any> // 3