// 将字符串类型的元素转换为字符串字面量类型
export default {}

type TupleToString<T, Pre extends string = ''> =
  T extends [infer L, ...infer R]
  ? (L extends string ? TupleToString<R, `${Pre}${L}`> : never)
  : Pre

type A = TupleToString<['a', 'b', 'c']> // 'abc'
type B = TupleToString<[]>              // ''
type C = TupleToString<['a']>           // 'a'
type D = TupleToString<[123]>           // never
type E = TupleToString<['a', 'b', 'c', '-', 'a', 'b', '-', 'd']> // 'abc'
