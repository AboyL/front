const Axios = require('axios')

const instance = Axios.create()
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log('request1')
  config.data.test1 = 'test1'
  config.data.test2 = 'test2-1'
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});


instance.interceptors.request.use(function (config) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('request2')
      config.data.test2 = 'test2-2'
      resolve(config)
    }, 1000);
  })
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

instance.interceptors.response.use(function (res) {
  return new Promise((resolve) => {
    setTimeout(() => {
      res.data.test3 = 'test3'
      res.data.test4 = 'test4-1'
      resolve(res)
    }, 1000);
  })
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

instance.interceptors.response.use(function (res) {
  res.data.test4 = 'test4-2'
  return res
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

const t = Date.now()
instance.get('http://127.0.0.1:3000/', {
  timeout: 5000,
  data: {
    'test': 'test'
  }
}).then(res => {
  console.log('res---', Date.now() - t)
  console.log(res.data)
}, err => {
  console.log('err', err)
})