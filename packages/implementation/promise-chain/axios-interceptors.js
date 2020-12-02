const dispatchRequest = (config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(config)
    }, 3000);
  })
}

class InterceptorMannger {
  interceptors = []
  use (resolved, rejected) {
    // fn 返回一个普通的内容 或者返回一个 Promise
    this.interceptors.push({
      resolved,
      rejected,
    })
  }
}

class Axios {
  constructor() {
    this.interceptors = {
      request: new InterceptorMannger(),
      response: new InterceptorMannger(),
    }
  }
  // 返回一个Promise 如何进行promise的串联
  // 如何进行普通函数跟promise函数的统一
  // 使用promise.then来进行处理
  // 他们都可以接受一个函数 这个函数的返回值都会被当成promise来进行处理
  // 可以生成一个统一的promise来处理
  async request (config) {
    // 初始化
    // let promise = Promise.resolve(config)
    // this.interceptors.request.interceptors.forEach(interceptor => {
    //   promise = promise.then(interceptor.resolved, interceptor.rejected)
    // });
    // // 此时处理了 真正的请求
    // promise = promise.then(dispatchRequest)
    // // 次数处理返回值
    // this.interceptors.response.interceptors.forEach(interceptor => {
    //   promise = promise.then(interceptor.resolved, interceptor.rejected)
    // });

    const chain = [{
      resolved: dispatchRequest,
      rejected: undefined
    }]
    this.interceptors.request.interceptors.forEach(interceptor => {
      chain.unshift({
        resolved: interceptor.resolved,
        rejected: interceptor.rejected
      })
    });
    this.interceptors.response.interceptors.forEach(interceptor => {
      chain.push({
        resolved: interceptor.resolved,
        rejected: interceptor.rejected
      })
    });
    let promise = Promise.resolve(config)
    while (chain.length) {
      const { resolved, rejected } = chain.shift()
      promise = promise.then((cf) => resolved(cf), rejected)
    }
    return promise
  }
}

const instance = new Axios()
instance.interceptors.request.use((config) => {
  config.data.test2 = 'test2'
  config.data.test3 = 'test3-1'
  return config
})

instance.interceptors.request.use((config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      config.data.test3 = 'test3-2'
      resolve(config)
    }, 3000);
  })
})

instance.interceptors.response.use((res) => {
  res.data.test4 = 'test4-1'
  return res
})

instance.interceptors.response.use((res) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      res.data.test4 = 'test4-2'
      resolve(res)
    }, 1000);
  })
})

instance.request({
  data: {
    test: 'test1'
  }
}).then(res => {
  console.log(res.data)
})
// 洋葱模型
// req2 req1 dispath(config->res) res1 res2