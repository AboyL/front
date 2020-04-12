// 如何实现一个mobx
const myMobx = require('./my-mobx')
const { autorun, observable } = myMobx
const appStore = observable({
  timer: 0,
  test: 2,
})
autorun(() => {
  console.log(appStore.timer)
})
autorun(() => {
  console.log(appStore.timer + 'sss')
})
appStore.timer = 1
// 此时打印 1
// 此时打印 1sss



appStore.test = 3
// 此时不进行打印