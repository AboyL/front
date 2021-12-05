export default {}

// 需要注意对单个的处理
type SplitString<T, S extends string, Pre extends string[] = []> =
  T extends `${infer R}${S}${infer L}`
  ? SplitString<L, S, [...Pre, R]>
  : [...Pre, T]

// 一样是进行字符串分割
type A1 = SplitString<'handle-open-flag', '-'>        // ["handle", "open", "flag"]
type A2 = SplitString<'open-flag', '-'>               // ["open", "flag"]
type A3 = SplitString<'handle.open.flag', '.'>        // ["handle", "open", "flag"]
type A4 = SplitString<'open.flag', '.'>               // ["open", "flag"]
type A5 = SplitString<'open.flag', '-'>               // ["open.flag"]