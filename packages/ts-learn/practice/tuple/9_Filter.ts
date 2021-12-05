// 保留元组类型T中的A类型

type Filter<T, N, Pre extends any[] = []> =
  T extends [infer L, ...infer R] ?
  // 这段代码会产生一个联合类型
  // L extends N ? Filter<R, N, [...Pre, L]> : Filter<R, N, [...Pre]>
  [L] extends [N] ? Filter<R, N, [...Pre, L]> : Filter<R, N, [...Pre]>
: Pre

// export type Filter<T extends any[], K, TT extends any[] = []> = T extends [infer L, ...infer R]
//   ? Filter<R, K, ([L] extends [K] ? [...TT, L] : TT)>
//   : TT

type A = Filter<[1, 'BFE', 2, true, 'dev'], number> // [1, 2]
type B = Filter<[1, 'BFE', 2, true, 'dev'], string> // ['BFE', 'dev']
type C = Filter<[1, 'BFE', 2, any, 'dev'], string> // ['BFE', any, 'dev']