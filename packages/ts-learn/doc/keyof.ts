export default {}
interface A {
  name: string,
  age: number
}
type Keys<T> = keyof T
type C = Keys<A>
let c: C = 'age'



interface AO {
  a: string
}


interface AO1 {
  b: string
}

type More<T, U> = T & U

type AM = More<AO, AO1>

let aM:AM = {
  a: '1',
  b: 's'
}

type A1=keyof any
// type A1 = string | number | symbol
type A2=keyof number
// type A1 = "toString" | "toFixed" | "toExponential" | "toPrecision" | "valueOf" | "toLocaleString"
type A3=keyof undefined
// type A3 = never
type A4=keyof null
// type A3 = never
type A5=keyof never
// type A5 = string | number | symbol
