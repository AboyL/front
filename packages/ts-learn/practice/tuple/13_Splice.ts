
// type A1 = Splice<[string, number, boolean, null, undefined, never], 0, 2>                   
// // [boolean,null,undefined,never]               从第0开始删除，删除2个元素
// type A2 = Splice<[string, number, boolean, null, undefined, never], 1, 3>                   
// // [string,undefined,never]                     从第1开始删除，删除3个元素
// type A3 = Splice<[string, number, boolean, null, undefined, never], 1, 2, [1, 2, 3]>        
// // [string,1,2,3,null,undefined,never]          从第1开始删除，删除2个元素，替换为另外三个元素1,2,3