学习如何使用http

内容总结思路
http的基础知识

如何创建服务
如何处理get请求
如何处理post请求
如何处理路由
http里面有什么内容
为什么cdn可以进行优化
怎么搭建http2
https


在命令行查看相关的内容
curl -v url
请求行 请求头 请求体

响应行 响应体 响应体体


需要掌握什么
1. 状态码
2. 头信息

状态码(可以自定义 但是一般是约定好比较好)
- 1 ws
- 2 200成功 204成功了但是没有请求体 206部分请求(例如分片，多媒体资源)
- 3 301永久重定向 302临时重定向 304缓存(服务端缓存策略 协商缓存) 307跳转的时候不会改变方法
- 4 400参数错误 401权限 403登陆了没有权限 404找不到内容 405方法不存在
- 5 500服务端异常内部错误 502网关错误 503 

请求方法
- restful API 根据不同的请求方法来做响应
get post delete put options

options 跨域使用 默认先访问一次 预检请求
简单请求 不会发生Options
只有get和post 如果在这两个请求的基础上增加了自定义header，会变成复杂请求
其他方法都是复杂请求，带了token就是复杂请求了
Options不会带请求体

uri
资源唯一标识符

url
统一资源定位符
协议://用户权限@域名:端口号/资源?查询参数#hash
hash后端拿不到

urn


基本用法
createServer
  req 内部依旧是eventEmiyyer
  res
listern
on
  request 等同于传进来函数

自动重启的内容
supervisor
nodemon
pm2


分析请求相关的内容

请求行
req.method
req.url
req.httpVersion
http是基于tcp的 在tcp的基础上增加了内容，内容被分割后，放到了对应的req和响应上
url模块
  对url路径进行解析
  url.parse 解析成对象
    解析出来的对象的各个意思是什么?是什么，有什么?

请求头 req.header
都是小写的key-value
host
connection

请求体
post这些

req 是一个可读流 所以有on('data') 来处理post请求
req.on('end') 无论请求体是否有，都会执行
res 是可写流

res
statusCode
statusMessage
setHeader
res.end

响应体
res.write
res.end



如何实现一个http server
1. 解析参数
2. 解析请求路径
3. 分析文件夹文件
4. 返回内容 尽量使用绝对路径，处理类型
  文件夹处理
  文件处理 注意不同的类型的header有所不同
5. 流式读取 res所以可写流
6. 模板引擎 ejs
7. 路径处理
8. 缓存 header的应用

1.如何解析命令行参数
使用commander
文档地址
https://github.com/tj/commander.js/blob/HEAD/Readme_zh-CN.md#%e5%a3%b0%e6%98%8e-program-%e5%8f%98%e9%87%8f


1. 指定端口号
2. 指定目录
3. 文件是否缓存

一个命令行参数的设置
option
desc
default
usage

program.on --help 可以监听到对应的命令执行的时候的情况



缓存
强制缓存
浏览器不会发送请求

协商缓存
浏览器会给后端发请求，后端进行对比以后，返回304，则走浏览器缓存，虽然还是要发请求，但是传输的内容会少很多

我们应该设置什么样的缓存机制 才比较好
md5戳 摘要算法

对css这些，可以打包的时候产生md5戳，然后设置强制缓存