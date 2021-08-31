const m1 = require('./m1')
console.log('m1', m1)
// 模块化原理
// 每个js文件的内容,最终会被包裹成
// const wrapper = [
// '(function (exports, require, module, __filename, __dirname) { ',
//     script
//];
// 的形式执行
// 并且返回module.export