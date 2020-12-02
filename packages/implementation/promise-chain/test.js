const dispatchRequest = (config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(config)
    }, 1000);
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

  interceptors = {
    request: new InterceptorMannger(),
    response: new InterceptorMannger(),
  }

  async request (config) {
    
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
  console.log('request 1')
  config.data.test2 = 'test2'
  config.data.test3 = 'test3-1'
  return config
})

instance.interceptors.request.use((config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('request 2')
      config.data.test3 = 'test3-2'
      resolve(config)
    }, 1000);
  })
})

instance.interceptors.response.use((res) => {
  console.log('response 1')

  res.data.test4 = 'test4-1'
  return res
})

instance.interceptors.response.use((res) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('response 2')
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