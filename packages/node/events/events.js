class Events {
  events = {}

  on (eventName, callBack) {
    // 处理 newListener
    if (eventName !== 'newListener') {
      this.emit('newListener', eventName, callBack)
    }
    if (this.events[eventName]) {
      this.events[eventName].push(callBack)
    } else {
      this.events[eventName] = [callBack]
    }
  }

  emit (eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(callback => {
        callback(...args)
      })
    }
  }

  off (eventName, offCallback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(callback => {
        return offCallback !== callback && offCallback !== callback.once
      })
    }
  }

  once (eventName, callback) {
    const onceCallback = (...args) => {
      callback(...args)
      this.off(eventName, onceCallback)
    }
    // 处理 以下情况
    // e1.once('test', ee1)
    // e1.off('test', ee1)
    onceCallback.once = callback
    this.on(eventName, onceCallback)
  }
}

module.exports = Events