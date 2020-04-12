const mobx = require('mobx')
const { autorun, observable } = mobx
const appStore = observable({
  timer: 0,
  test: 2,
})
autorun(() => {
  console.log(appStore.timer)
})
appStore.timer = 1
// 此时打印 1

appStore.test = 3
// 此时不进行打印