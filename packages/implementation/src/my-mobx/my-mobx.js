// Observable 。用来包装一个属性为 被观察者
// autorun 。用来包装一个方法为 观察者，只会观察自己依赖到的设为 observable 的值。
// 当使用 autorun 时，所提供的函数总是立即被触发一次，然后每次它的依赖关系改变时会再次被触发
const dependenceManager = require('./dependenceManager')

let collectCounter = 0
const mobx = {
  autorun (handler) {
    dependenceManager.beginCollect(handler);
    handler(); // 立即执行一次 用来进行依赖的收集
    // 通过 observable 的 get 动作来实现的
    // 每个被 observable 过的值在 get 的时候都会判断当前是否正在收集依赖
    // 如果是的话，就会把这个值 和 当前正在收集依赖的 handler 关联起来存储在 dependenceManager 中
    dependenceManager.endCollect();
  },
  observable (target) {
    // 在 get 中响应依赖收集，在 set 中触发监听函数
    for (let k in target) {
      let value = target[k]
      const obId = 'co-' + (++collectCounter)
      Object.defineProperty(target, k, {
        get () {
          dependenceManager.collect(obId)
          return value
        },
        set (v) {
          value = v
          dependenceManager.trigger(obId)
        }
      })
    }
    return target
  }
}

module.exports = mobx