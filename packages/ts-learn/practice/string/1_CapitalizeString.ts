// https://www.wolai.com/aE1oVmBGkgqPhzQcwmRuJU

// 首字母大写

type CapitalizeString<T> = T extends `${infer R}${infer L}` ? `${Uppercase<R>}${L}` : T

type a1 = CapitalizeString<'handler'>       // Handler
type a2 = CapitalizeString<'parent'>        // Parent
type a3 = CapitalizeString<233>             // 233