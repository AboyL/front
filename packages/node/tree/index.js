class Node {
  constructor(element, parent) {
    this.element = element
    this.parent = parent
    this.left = null
    this.right = null
  }
}

class Tree {
  constructor() {
    this.root = null
  }
  _compare (e1, e2) {
    return e1 > e2
  }
  add (element) {
    if (this.root) {
      // left比root小 right比root大
      let currentNode = this.root
      let parent = this.root
      let compare;
      while (currentNode) {
        compare = this._compare(currentNode.element, element)
        parent = currentNode
        // 进行下一轮比较 compare为true表示当前的更大一些 
        // 应该放到左边
        if (compare) {
          currentNode = currentNode.left
        } else {
          currentNode = currentNode.right
        }
      }
      // 比较完了 有位置了
      // 此时 currentNode 为null
      const newNode = new Node(element, parent)
      if (compare) {
        parent.left = newNode
      } else {
        parent.right = newNode
      }
    } else {
      this.root = new Node(element, null)
    }
  }

  // 前序遍历
  prevoderTreaversal (cb) {
    const traversal = (node) => {
      if (!node) {
        return
      }
      cb(node)
      traversal(node.left)
      traversal(node.right)
    }
    traversal(this.root)
  }
  // 中序
  inoderTreaversal (cb) {
    const traversal = (node) => {
      if (!node) {
        return
      }
      traversal(node.left)
      cb(node)
      traversal(node.right)
    }
    traversal(this.root)
  }
  // 后序
  postoderTreaversal (cb) {
    const traversal = (node) => {
      if (!node) {
        return
      }
      traversal(node.left)
      traversal(node.right)
      cb(node)
    }
    traversal(this.root)
  }
  prevoderTreaversalWhle (cb) {
    const stack = []
    stack.push(this.root)
    while (stack.length !== 0) {
      let node = stack.pop()
      cb(node)
      if (node.right) {
        stack.push(node.right)
      }
      if (node.left) {
        stack.push(node.left)
      }
    }
  }
  levelTreaversal (cb) {
    const queue = []
    queue.push(this.root)
    while (queue.length !== 0) {
      let node = queue.shift()
      cb(node)
      if (node.left) {
        queue.push(node.left)
      }
      if (node.right) {
        queue.push(node.right)
      }
    }
  }
  // 树的反转
  reverseTree () {
    this.prevoderTreaversal(node => {
      let left = node.left
      node.left = node.right
      node.right = left
    })
  }
}

let tree = new Tree()
tree.add(8)
tree.add(6)
tree.add(10)
tree.add(7)

console.log(tree)
tree.reverseTree()
console.log(tree)
// tree.prevoderTreaversal((node) => {
//   console.log(node.element)
// })
// console.log('-----------------------')
// tree.prevoderTreaversalWhle((node) => {
//   console.log(node.element)
// })
// console.log('-----------------------')
// tree.levelTreaversal((node) => {
//   console.log(node.element)
// })