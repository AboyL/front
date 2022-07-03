// 考虑到各种key的情况的
// 实现基本的响应式数据
// 本质是有点类似mobx

const data = { a: 1, b: '2' }
// const data = { a: 1, b: 2 }


let activeEffect

// 删除以后进行重新收集
const cleanup = (effectFn) => {
  for (let effectDep of effectFn.deps) {
    effectDep.delete(effectFn)
  }
  effectFn.deps.length = 0
}

const effect = (fn) => {
  const effectFn = () => {
    cleanup(effectFn)
    activeEffect = effectFn
    fn()
  }
  effectFn.deps = []
  effectFn()
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
  // 添加副作用列表
  activeEffect.deps.push(effects)
}

function trigger (target, key, newVal) {
  // 副作用执行
  let depsMap = bucket.get(target)

  if (!depsMap) {
    return
  }
  let effects = depsMap.get(key)
  // 在执行完了以后 需要清除掉 effects 因为后续中可能出现分支的情况
  const effectsToRun=new Set(effects)
  effectsToRun && effectsToRun.forEach(fn => fn());
}

effect(() => {
  console.log('effet', obj.b === 2 ? obj.a : 'switch change ')
})





// 当初始值的 obj.b 为 2 '2' 的时候存在完全不同的执行结果
obj.a = '3' // 此时不effect
obj.b = 2 // 这里不再进行调用
obj.a = '4' // 执行
obj.b = '2' // 执行
obj.a = '5' // 不应该执行
obj.a = '6' // 不应该执行




