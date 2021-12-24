import { OptionalKeys } from "./1_OptionalKeys"

export default {}
// 保留一个对象中的可选属性类型
// in 后面跟一个联合类型形成迭代
type PickOptional<T> = {
  [K in OptionalKeys<T>]: T[K]
}
// export type PickOptional<T> = Pick<T,OptionalKeys<T>>;
// K extends keyof T ? (Omit<T, K> extends T ? K : never) : never

type a1 = PickOptional<{ foo: number | undefined, bar?: string, flag: boolean }>
// {bar?:string|undefined}
type a2 = PickOptional<{ foo: number, bar?: string }>
// {bar?:string}
type a3 = PickOptional<{ foo: number, flag: boolean }>
// {}
type a4 = PickOptional<{ foo?: number, flag?: boolean }>
// {foo?:number,flag?:boolean}
type a5 = PickOptional<{}>
// {}