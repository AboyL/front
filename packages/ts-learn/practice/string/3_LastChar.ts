export default {}

type LastChar<T, Pre = never> = T extends `${infer R}${infer L}`
  ? LastChar<L, R>
  : Pre

type A = LastChar<'BFE'> // 'E'
type B = LastChar<'dev'> // 'v'
type C = LastChar<''> // never
type D = LastChar<123> // never
