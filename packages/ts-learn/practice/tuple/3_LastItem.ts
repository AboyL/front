export default {}
// 得到元组类型中的最后一个元素
type LastItem<T, Pre = never> = T extends [infer L, ...infer R] ? LastItem<R, L> : Pre

type A = LastItem<[string, number, boolean]> // boolean
type B = LastItem<['B', 'F', 'E']> // 'E'
type C = LastItem<[]> // never