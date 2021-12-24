export default {}
// 获取对象类型中的可选属性的联合类型


// 怎么判断是否是可选类型?假如
// 怎么获取一个联合类型？keyof interface
// 通过Exclude来排除掉一些类型
// type OptionalKeys<T>=keyof {
//   [K in keyof T]:T[K]
// }
// 为什么 Exclude 可以给?加一个undefined?
// type Exclude<T, U> = T extends U ? never : T;
type ex1 = Exclude<1 | 2 | 3, 1>
type ex2 = Exclude<{
  a: 1,
  b: 1
}, { a: 1, b: 1, c: 1 }>
type ExcludeUndefined<T> = { [K in keyof T]: Exclude<T[K], undefined> }
// type ExcludeUndefined<T> = { [K in keyof T]: T[K] }
// K in keyof T 可以将类型进行分发 加上 undefined
// type ExcludeUndefined2<T> = { [K in keyof T]: K }


type e1 = ExcludeUndefined<{
  s: 1,
  a: 1 | undefined,
  c: undefined,
  e?: 2,
}>
type e12 = ExcludeUndefined<{
  s: 1,
  a: 1 | undefined,
  c: undefined,
  e?: 2,
}>
//方式一
export type OptionalKeys33<T> =
  // -号是为了排除 最后生成的联合类型的 undefined
  { [K in keyof T]-?: undefined extends ExcludeUndefined<T>[K] ? K : never }[keyof T]
// { [K in keyof T]-?: K}

type O331 = OptionalKeys33<{
  a?: 1,
  b?: 1,
  c: string
}>
// 方式二
export type OptionalKeys3<T, K = keyof T> =
  K extends keyof T ? (undefined extends ExcludeUndefined<T>[K] ? K : never) : never

// 方式三
type O31 = OptionalKeys3<{
  a?: 1,
  b?: 1,
  c: string
}>
// 可以认为是写循环的另外一种方式
type Union2<T, K = keyof T> = K extends keyof T ? K : never // => keyof T
type u2 = Union2<{ a: 1, b: 2 }>
// Exclude 的作用是从 T 中排除出可分配给 U的元素.
// Omit<T, K>的作用是忽略T中的某些属性
// Omit = Exclude + Pick
// 如果把某些属性忽略掉还能extends给T 那么就表示是一个可选类型了
export type OptionalKeys<T, K = keyof T> =
  K extends keyof T ? (Omit<T, K> extends T ? K : never) : never


type a1 = OptionalKeys<{ foo: number | undefined, bar?: string, flag: boolean }>
// bar
type a2 = OptionalKeys<{ foo: number, bar?: string }>
// bar
type a3 = OptionalKeys<{ foo: number, flag: boolean }>
// never
type a4 = OptionalKeys<{ foo?: number, flag?: boolean }>
// foo|flag
type a5 = OptionalKeys<{}>
// never