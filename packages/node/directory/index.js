// 对文件夹进行操作
const { dir } = require('console')
const fs = require('fs').promises
const path = require('path')
// 串行删除 深度 递归
// const rmdir = (root, cb) => {
//   fs.stat(root, (err, statObj) => {
//     if (statObj.isFile()) {
//       fs.unlink(root, cb)
//     } else {
//       // 循环目录删除
//       fs.readdir(root, (err, dirs) => {
//         const dirsPathList = dirs.map((d) => path.join(root, d))
//         let index = 0
//         // 为什么只调用了一次cb 注意执行顺序
//         // 只应该调用一次cb 其他的都是递归调用
//         function next () {
//           if (index === dirs.length) {
//             fs.rmdir(root, cb)
//           } else {
//             let current = dirsPathList[index++]
//             // 使用next执行上一层的删除
//             // rmdir(current, next)
//             rmdir(current, () => {
//               console.log(current)
//               next()
//             })
//           }
//         }
//         next()
//       })
//     }
//   })
// }



// 广度删除 循环 栈维护

// const rmdir = (root, cb) => {
//   const stack = [root]
//   const remove = () => {
//     const last = stack.pop()
//     if (!last) {
//       cb()
//       return
//     }
//     fs.stat(last, (err, statObj) => {
//       if (statObj.isFile()) {
//         console.log('last',last)
//         fs.unlink(last, remove)
//       } else {
//         fs.rmdir(last, remove)
//       }
//     })
//   }
//   fs.stat(root, (err, statObj) => {
//     if (statObj.isFile()) {
//       fs.unlink(root, cb)
//     } else {
//       // 维护数组
//       // 同步维护数组 异步进行删除
//       let index = 0
//       function next () {
//         if (index === stack.length) return remove()
//         let current = stack[index]
//         fs.readdir(current, (err, dirs=[]) => {
//           const dirsPathList = dirs.map((d) => path.join(current, d))
//           stack.push(...dirsPathList)
//           index++
//           next()
//         })
//       }
//       next()
//     }
//   })
// }

// 并发删除  依旧是深度递归删除
// const rmdir = (root, cb) => {
//   fs.stat(root, (err, statObj) => {
//     if (statObj.isFile()) {
//       fs.unlink(root, cb)
//     } else {
//       fs.readdir(root, (err, dirs = []) => {
//         const dirsPathList = dirs.map((d) => path.join(root, d))
//         if (dirsPathList.length === 0) {
//           // 注意在递归调用中的时候的cb已经不是一开始传进来的cb了
//           fs.rmdir(root, cb)
//         }
//         let index = 0
//         const removeCount = () => {
//           index++
//           if (index === dirsPathList.length) {
//             // 所有的子节点都删除了
//             fs.rmdir(root, cb)
//           }
//         }
//         dirsPathList.forEach((dir) => {
//           rmdir(dir, removeCount)
//         })
//       })
//     }
//   })
// }

const rmdir = async (root) => {
  let statObj = await fs.stat(root)
  if (statObj.isFile()) {
    await fs.unlink(root)
  } else {
    const dirs = await fs.readdir(root) || []
    const dirsPathList = dirs.map((d) => rmdir(path.join(root, d)))
    await Promise.all(dirsPathList)
    await fs.rmdir(root)
  }
}

// const fn = (err) => { console.log(err) }
// fs.mkdirSync('a', fn)
// fs.mkdirSync('a/b', fn)
// fs.mkdirSync('a/b/c', fn)
// fs.mkdirSync('a/b/d', fn)

// (async () => {
//   const fn = (err) => { console.log(err) }
//   await fs.mkdir('a', fn)
//   await fs.mkdir('a/b', fn)
//   await fs.mkdir('a/b/c', fn)
//   await fs.mkdir('a/b/d', fn)

// })()


rmdir('a', () => {
  console.log('删除成功')
})
// fs.rmdir('a',(err)=>{
//   console.log(err)
// })