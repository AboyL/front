export default {}

// 计算字符串字面量类型的长度
type LengthOfString<T, Tu extends any[] = []> =
  T extends `${infer R}${infer L}`
  ? LengthOfString<L, [...Tu, R]>
  : Tu['length']

type A = LengthOfString<'BFE.dev'> // 7
type B = LengthOfString<''> // 0
type C = LengthOfString<'1'> // 1
type D = LengthOfString<'12'> // 0