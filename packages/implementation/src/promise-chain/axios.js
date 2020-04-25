const Axios = require('axios')

const instance = Axios.create()
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.data.test2 = 'test2'
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});


instance.interceptors.request.use(function (config) {
  return new Promise((resolve) => {
    setTimeout(() => {
      config.data.test3 = 'test3'
      resolve(config)
    }, 3000);
  })
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