export default {}
// 拍平元组
// 通过 ... 实现数组的降纬
type Flat<T> =
  T extends [infer L, ...infer R]
  ? (
    L extends any[] ? [...Flat<L>, ...Flat<R>] : [L, ...Flat<R>]
  )
  : []

type A = Flat<[1, 2, 3]> // [1,2,3]
type B = Flat<[1, [2, 3], [4, [5, [6]]]]> // [1,2,3,4,5,6]
type C = Flat<[]> // []
type D = Flat<[1]> // [1]