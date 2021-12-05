// 复制字符T为字符串类型，长度为C

// 通过元组来进行数字的计算
export default {}

type GetTupleLength<T> = T extends Array<number> ? T['length'] : T

type Arr1 = GetTupleLength<[1, 2, 3]>

type RepeatString<T extends string, N extends number, I extends Array<any> = [], Pre extends string = ''> =
  I['length'] extends N
  ? Pre
  : RepeatString<T, N, [...I, T], `${Pre}${T}`>

type A = RepeatString<'a', 3> // 'aaa'
type B = RepeatString<'a', 0> // ''
type C = RepeatString<'a', 1> // ''
