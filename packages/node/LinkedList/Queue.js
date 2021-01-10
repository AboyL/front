const LinkedList = require('./index')
class Queue {
  constructor() {
    this.ll = new LinkedList()
  }
  add (element) {
    this.ll.add(element)
  }
  offer () {
    return this.ll.remove(0)
  }
}

module.exports = Queue