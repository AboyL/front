export default {}

// 整体的思路看起来还是通过元组的长度来进行判断
type Slice<T extends any[], S extends number, E extends number = T['length'], SA extends any[] = [], EA extends any[] = [], Pre extends any[] = []> =
  T extends [infer L, ...infer R]
  ? (
    SA['length'] extends S
    // 注意把当前这个也加入进去
    ? EA['length'] extends E ? [...Pre, L] : Slice<R, S, E, SA, [...EA, L], [...Pre, L]>
    : Slice<R, S, E, [...SA, L], [], []>
  )
  : Pre

type A1 = Slice<[any, never, 1, '2', true, boolean], 0, 2>
// [any,never,1]                    从第0个位置开始，保留到第2个位置的元素类型

type A2 = Slice<[any, never, 1, '2', true, boolean], 1, 3>
// [never,1,'2']                    从第1个位置开始，保留到第3个位置的元素类型

type A3 = Slice<[any, never, 1, '2', true, boolean], 1, 2>
// [never,1]                        从第1个位置开始，保留到第2个位置的元素类型

type A4 = Slice<[any, never, 1, '2', true, boolean], 2>
// [1,'2',true,boolean]             从第2个位置开始，保留后面所有元素类型

type A5 = Slice<[any], 2>
// []                               从第2个位置开始，保留后面所有元素类型

type A6 = Slice<[], 0>
// []                               从第0个位置开始，保留后面所有元素类型