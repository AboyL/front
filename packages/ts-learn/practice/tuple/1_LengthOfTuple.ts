export default {}
// https://www.wolai.com/vTLcirN6qGbd2mp7wqwzwV
// 计算元组类型的长度
type LengthOfTuple<T> = T extends number[] ? T['length'] : never

type A = LengthOfTuple<['B', 'F', 'E']> // 3
type B = LengthOfTuple<[]> // 0
