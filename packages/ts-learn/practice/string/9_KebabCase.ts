export default {}

// 驼峰命名转横杠命名

// 如果与大写后的字符相同 那么就表示应该进行变化，但是怎么进行判断呢?


type KebabCase<T, Pre extends string ='', F extends boolean = true> =
  T extends `${infer R}${infer L}` // 当没有的时候表示走完了
  ? (
    // 如果R跟大写后的等价，那么就要转成小写，并且假如不是第一个，就要给前面的添加一个 -
    R extends `${Uppercase<R>}`
    ? F extends true
      ? KebabCase<L, `${Pre}${Lowercase<R>}`, false>
      : KebabCase<L, `${Pre}-${Lowercase<R>}`, false>
    : KebabCase<L, `${Pre}${R}`, false>
  )
  : Pre


  type A1 = KebabCase<'HandleOpenFlag'>           // handle-open-flag
  type A2 = KebabCase<'OpenFlag'>                 // open-flag
  type A3 = KebabCase<'HandleOpen'>           // handle-open-flag
