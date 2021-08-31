
const { Readable } = require('stream'); // 可读流接口
// Readable.prototype.read  父类实现的  父类里面有一个read方法
// 我要自定义一个可读流

// fs.createReadStream 只是重写了_read方法
// 文件可读流 和 流的区别
let i = 0
class MyReadStream extends Readable {
  _read () {
    // setTimeout(() => {
    //   console.log('---------')
    //   this.push('123')
    //   // // fs.readFile
    //   // this.push(null)
    // }, 1000);
    if (i < 3) {
      this.push('123')
      i++
    }
  }
}
let myStream = new MyReadStream()
myStream.on('data', function (chunk) { // 当用户监听了data事件后 会触发Readable.read方法，父类会调用子类自己实现的_read方法, 当监听事件后会不停的触发_read方法
  console.log(chunk);
})
myStream.on('end', function () {
  console.log('end');
})