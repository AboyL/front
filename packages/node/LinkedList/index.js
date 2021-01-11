// 数据结构中 要有增删改查
// add(element)
// remove(index)
// set(index,element)
// get(index)

class Node {
  constructor(element, next) {
    this.element = element
    this.next = next
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.size = 0
  }
  add (index, element) {
    // 兼容处理
    if (!element) {
      element = index
      index = this.size
    }
    if (index === 0) {
      let head = this.head
      this.head = new Node(element, head)
    } else {
      // 找到当前位置的节点，并且将这个节点替换成新的节点，并且让新的节点指向原来的节点
      let preNode = this.get(index - 1)
      preNode.next = new Node(element, preNode.next)
    }
    this.size++
  }
  remove (index) {
    let removeNode = null
    if (index === 0) {
      removeNode = this.head
      this.head = this.head.next
    } else {
      let pre = this.get(index - 1)
      removeNode = pre.next
      pre.next = pre.next.next
      // 自助垃圾回收
    }
    this.size--
    return removeNode.element
  }
  set (index, element) {
    const node = this.get(index)
    node.element = element
    return node
  }
  get (index) {
    let currnet = this.head
    for (let i = 0; i < index; i++) {
      currnet = currnet.next
    }
    return currnet
  }
  // 进行反转
  reverse () {
    const _reverse = (head) => {
      if (head === null || head.next === null) {
        return head
      }
      let newHead = _reverse(head.next)
      head.next.next = head
      head.next = null
      return newHead
    }
    this.head = _reverse(this.head)
    return this.head
  }
}

const link = new LinkedList()
link.add(1)
link.add(2)
link.add(3)

console.log(link)
link.reverse()
console.log(link)

// {element,next:{element,next:null}}

module.exports = LinkedList