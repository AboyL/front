
// 应该跟Slice是一个反向的操作

type Splice<
  T extends any[], S extends number, E extends number = T['length'],
  Replace extends any[] = [],
  SA extends any[] = [], EA extends any[] = [], Pre extends any[] = []
  > =
  T extends [infer L, ...infer R]
  ? SA['length'] extends S
    ? EA['length'] extends E
      // 对Replace的内容进行处理
      ? Replace extends [infer RR, ...infer RL]
        ? Splice<[L,...R], S, E, RL, SA, EA, [...Pre, RR]>
        : Splice<R, S, E, Replace, SA, EA, [...Pre, L]>
      : Splice<R, S, E, Replace, SA, [...EA, L], [...Pre]>
    : Splice<R, S, E, Replace, [...SA, L], EA, [...Pre, L]>
  : Pre

type A1 = Splice<[string, number, boolean, null, undefined, never], 0, 2>
// [boolean,null,undefined,never]               从第0开始删除，删除2个元素
type A2 = Splice<[string, number, boolean, null, undefined, never], 1, 3>
// [string,undefined,never]                     从第1开始删除，删除3个元素
type A3 = Splice<[string, number, boolean, null, undefined, never], 1, 2, [1, 2, 3]>
// [string,1,2,3,null,undefined,never]          从第1开始删除，删除2个元素，替换为另外三个元素1,2,3