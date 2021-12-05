export default {}


// 当any extends 一个类型的时候 会出现一个联合类型
// extends 条件类型左边如果是个泛型的话，而且这个泛型的值传递的时候是一个联合类型，就会有分发机制
// any = { [k in string|number|symbol]:any }
// 是不是可以大概理解为 
// any = string|number|boolean|undefined|null|symbol|Record<string|boolean|symbol,any>
type Exany<T> = T extends number ? '1' : 2

type A = Exany<3>
type B = Exany<any> // any具有特殊性质

type ExanyArr<T> = [T] extends [number] ? '1' : 2
type C = ExanyArr<any> // any具有特殊性质

type ExanyArr2<T,U> = T[] extends U[] ? '1' : 2
type D = ExanyArr2<any,number> // any具有特殊性质
type E = ExanyArr2<any,1> // any具有特殊性质

