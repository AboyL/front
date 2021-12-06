export default {}
// 横杠命名转化为驼峰命名

// 一样的判断方案
// 问题在于什么时候进行转化，可以写三个infer 当中间的这个是 - 的时候表示前面的需要进行大写

export type CamelCase<T, Pre extends string = '', F extends boolean = true> =
  T extends `${infer R}${infer S}` // 当没有的时候表示走完了
  ? (
    // 如果R跟大写后的等价，那么就要转成小写，并且假如不是第一个，就要给前面的添加一个 -
    R extends `-`
    ? CamelCase<`${Capitalize<S>}`, `${Pre}`, false>
    : F extends true
    ? CamelCase<`${S}`, `${Pre}${Capitalize<R>}`, false>
    : CamelCase<`${S}`, `${Pre}${R}`, false>
  )
  : Pre

type a1 = CamelCase<'handle-open-flag'>         // HandleOpenFlag
type a2 = CamelCase<'open-flag'>                // OpenFlag
