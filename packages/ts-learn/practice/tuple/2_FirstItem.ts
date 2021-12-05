export default {}
// 得到元组类型中的第一个元素
// 当没有元素的时候怎么指向never?
// 当T[0]是undefined的时候指向never
// type FirstItem<T> = T extends any[] ? T[0] extends undefined ? never : T[0] : never
type FirstItem<T> = T extends [infer L, ...infer R] ? L : never
type A = FirstItem<[string, number, boolean]> // string
type B = FirstItem<['B', 'F', 'E']> // 'B'
type C = FirstItem<[]> // never
