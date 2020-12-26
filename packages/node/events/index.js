// 实现events的基本操作

// const EventEmitter = require('events'); // 事件触发器
const EventEmitter = require('./events'); // 事件触发器


class Event extends EventEmitter {}

const e1 = new Event()

e1.on('newListener', (...args) => {
  console.log('newListener', ...args)
})

// e1.on('test', (...args) => {
//   console.log('test1', ...args)
// })

// e1.emit('test', 1, 2, 3, 4)

// e1.on('test', (...args) => {
//   console.log('test2', ...args)
// })

e1.once('test', (...args) => {
  console.log('test3', ...args)
})

const ee1 = (...args) => {
  console.log('ee1', ...args)
}
const ee2 = (...args) => {
  console.log('ee2', ...args)
}

// e1.on('test', ee1)
e1.once('test', ee1)
e1.off('test', ee1)

e1.on('test', ee2)

e1.off('test', ee1)
e1.emit('test', 1, 2, 3, 4)
e1.off('test', ee2)
e1.emit('test', 1, 2, 3, 4)
