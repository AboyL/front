import { FindIndex } from "./10_FindIndex"

export default {}
// 注意没有办法真正的转化成元组
// 本质是变成元组的接口类型


// 最后一步肯定需要 in 联合类型


type TupleToEnum<T extends string[], K = false> =
  {
    readonly [k in T[number]]: K extends true ? FindIndex<T, k> : k
  }
// 默认情况下，枚举对象中的值就是元素中某个类型的字面量类型
type a1 = TupleToEnum<["MacOS", "Windows", "Linux"]>
// -> { readonly MacOS: "MacOS", readonly Windows: "Windows", readonly Linux: "Linux" }

// 如果传递了第二个参数为true，则枚举对象中值的类型就是元素类型中某个元素在元组中的index索引，也就是数字字面量类型
type a2 = TupleToEnum<["MacOS", "Windows", "Linux"], true>
// -> { readonly MacOS: 0, readonly Windows: 1, readonly Linux: 2 }



// in 语法里面的泛型接受 T[number] 也是一个迭代的意思 0 1 2 具有一个等价的实现方式为
type TupleKeys<
  T extends readonly any[]
> = T extends readonly [infer R, ...infer args]
      ? TupleKeys<args> | args['length']
      : never

// 结果：0 | 1 | 2
type OperatingSystem = ['macOs', 'Windows', 'Linux'] 
type keys = TupleKeys<OperatingSystem>
type TupleToEnum2<T extends readonly string[]> = {
  readonly [K in TupleKeys<T> as T[K]]: T[K]
}

type a11 = TupleToEnum2<["MacOS", "Windows", "Linux"]>

// 那么是否有第三种

// 那么首先要获得这个联合类型
type TupleToUnion<T> = T extends [infer L, ...infer R] ? L | TupleToUnion<R> : never
type AU = TupleToUnion<["MacOS", "Windows", "Linux"]>
type TupleToEnum3<T extends keyof any>={
  [K in  T]:K
}
type a22 = TupleToEnum3<AU>
