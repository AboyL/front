// 实现基本的响应式数据
// 本质是有点类似mobx

const data = { a: 1, b: 2 }

// 副作用收集桶
const bucket = new Set()

const obj = new Proxy(data, {
  get (target, key) {
    bucket.add(effet)
    return target[key]
  },
  set (target, key, newVal) {
    // 执行副作用
    target[key] = newVal;
    bucket.forEach(fn => fn());
    return true
  }
})

// 必须要设置为 effect 函数
function effect () {
  console.log('effect', obj.a)
}
effect()
obj.a = '3'
obj.b = 'b' // 这里也会进行处理
