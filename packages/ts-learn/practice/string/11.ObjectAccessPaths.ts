// 得到对象中的值访问字符串
export default {}

// 简单来说，就是根据如下对象类型：
/*
{
    home: {
        topBar: {
            title: '顶部标题',
            welcome: '欢迎登录'
        },
        bottomBar: {
            notes: 'XXX备案，归XXX所有',
        },
    },
    login: {
        username: '用户名',
        password: '密码'
    }
}
*/
// 得到联合类型：
/*
home.topBar.title | home.topBar.welcome | home.bottomBar.notes | login.username | login.password
*/

// 完成 createI18n 函数中的 ObjectAccessPaths<Schema>，限制函数i18n的参数为合法的属性访问字符串

// 怎么得到联合类型？通过key of
// 这个 Schema 就是对象 那么要做的是不是就是树转数组
// 问题是怎么进行递归下去？
// 可以使用一个对象来进行处理 怎么传入一个对象返回一个比这个对象多的值
type RemoveFirstDot<T> = T extends `.${infer L}` ? L : T
// type ObjectAccessPaths<T, Prev extends string = '', K = keyof T> =
//   K extends keyof T ? (
//     K extends string ? (
//       // 关键是在这里吗?
//       // T[K] extends Record<string, any> ? ObjectAccessPaths<T[K], `${Prev}.${K}`> : RemoveFirstDot<`${Prev}.${K}`>
//       RemoveFirstDot<`${Prev}.${K}`>
//     ) : never
//   )
//   : never


type ObjectAccessPaths<T, Prev extends string = '', K = keyof T> = 
  K extends keyof T ? (
    K extends string ? (
      // 关键是在这里吗? T[K] 实际上进行了遍历
      T[K] extends Record<string, any> ? ObjectAccessPaths<T[K], `${Prev}.${K}`> : RemoveFirstDot<`${Prev}.${K}`>
      // K 是一个联合类型
      // T[K] extends Record<string, any> ? K : '111'
      // RemoveFirstDot<`${Prev}.${K}`>
    ) : never
  )
  : never
// function createI18n<Schema>(schema: Schema) {
function createI18n<Schema>(schema: Schema): ((path: ObjectAccessPaths<Schema>) => string) {

  return [{ schema }] as any
}

// i18n函数的参数类型为：home.topBar.title | home.topBar.welcome | home.bottomBar.notes | login.username | login.password
const i18n = createI18n({
  home: {
    topBar: {
      title: '顶部标题',
      welcome: '欢迎登录'
    },
    bottomBar: {
      notes: 'XXX备案，归XXX所有',
    },
  },
  login: {
    username: '用户名',
    password: '密码'
  }
})


const a = i18n('home.topBar.welcome')         // correct
i18n('home.bottomBar.notes')        // correct

// i18n('home.login.abc')              // error，不存在的属性
// i18n('home.topBar')                 // error，没有到最后一个属性