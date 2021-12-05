export default {}

// 复制类型T为C个元素的元组类型

type Repeat<T, N extends number, Pre extends any[] = []> =
  Pre['length'] extends N ? Pre : Repeat<T, N, [...Pre, T]>

type A = Repeat<number, 3> // [number, number, number]
type B = Repeat<string, 2> // [string, string]
type C = Repeat<1, 1> // [1]
type D = Repeat<0, 0> // []
