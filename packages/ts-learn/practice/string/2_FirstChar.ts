// 获取字符串字面量中的第一个字符
export default {}
type FirstChar<T> = T extends `${infer R}${infer L}` ? `${R}` : never
type A = FirstChar<'BFE'> // 'B'
type B = FirstChar<'dev'> // 'd'
type C = FirstChar<''> // never