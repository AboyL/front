// exports = 1212 // 被引用得到 {}
// module.exports=1212 // 被引用得到 1212
// exports.a=1212 // 被引用得到 {a:1212}
// module.exports.a=1212 // 被引用得到 {a:1212}
// exports = { a: 1212 } // 被引用得到 {}
// module.exports = { a: 1212 } // 被引用得到 {a:1212}
// module = '1212' // 被引用得到 {}
// module = { exports: 1212 } // 被引用得到 {}

const { run } = require("jest")

// 一般使用 
module.exports = {
  p1: '1212'
}

function myRequire (id) {
  const module = {
    exports: {},
    load () {
      const script = 'code'
      const wrapper = [
        '(function (exports, require, module, __filename, __dirname) { ',
        script,
        '})'
      ]
      // 执行 wrapper
    }
  }

  module.load(id)
  return module.exports
}
