// 如何创建服务

const http = require('http')
const url = require('url')
http.createServer((req) => {
  console.log('----', req.url)
  console.log(url.parse(req.url,true))
}).listen(3000, function afterStart () {
  console.log('server start')
})

