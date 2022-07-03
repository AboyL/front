// 考虑到各种key的情况的
// 实现基本的响应式数据
// 本质是有点类似mobx

const data = { a: 1, b: 2 }

let activeEffect
const effect = (fn) => {
  activeEffect = fn
  fn()
}

// 副作用收集桶
// target
//    key1
//      effect11
//      effect12
//    key2
//      effect21
//      effect22
const bucket = new WeakMap()

const obj = new Proxy(data, {
  get (target, key) {
    trace(target, key)
    return target[key]
  },
  set (target, key, newVal) {
    // 正常的赋值
    target[key] = newVal;
    trigger(target, key, newVal)
  }
})

function trace (target, key) {
  if (!activeEffect) {
    return 
  }
  // 获取到对应的target中
  let depsMap = bucket.get(target)
  if (!depsMap) {
    depsMap = new Map()
    bucket.set(target, depsMap)
    // 这里判断map中的key有没有
  }
  let effects = depsMap.get(key)
  if (!effects) {
    effects = new Set()
    depsMap.set(key, effects)
  }
  effects.add(activeEffect)
}

function trigger (target, key, newVal) {
  // 副作用执行
  let depsMap = bucket.get(target)

  if (!depsMap) {
    return
  }
  let effects = depsMap.get(key)
  effects && effects.forEach(fn => fn());
}

effect(() => {
  console.log('effet', obj.a)
})

obj.a = '3'
obj.a = '4'
obj.b = 'b' // 这里不再进行调用
