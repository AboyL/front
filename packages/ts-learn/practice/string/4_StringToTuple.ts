// 字符串转换为元组类型
export default {}

// 一样需要借助循环
type StringToTuple<T, Pre extends Array<string> = []> =
  T extends `${infer R}${infer L}` ? StringToTuple<L, [...Pre, R]> : Pre
type A = StringToTuple<'BFE.dev'> // ['B', 'F', 'E', '.', 'd', 'e','v']
type B = StringToTuple<''> // []