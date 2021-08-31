const EventEmitter = require('events')
const http = require('http')

const context = require('./context')
const response = require('./response')
const request = require('./request')

// 1. 每个应用的上下文应该是独立的

class Application extends EventEmitter {

  constructor() {
    super()
    this.context = Object.create(context)
    this.response = Object.create(response)
    this.request = Object.create(request)
    // 应用间属性隔离

  }
  use (middleware) {
    this.middleware = middleware
  }

  createContext(req, res) {
    const context = Object.create(this.context);
    const request = context.request = Object.create(this.request);
    const response = context.response = Object.create(this.response);
    // 可以在自己的req里面拿到原生的req
    context.app = request.app = response.app = this;
    context.req = request.req = response.req = req;
    context.res = request.res = response.res = res;
    request.ctx = response.ctx = context;
    request.response = response;
    response.request = request;
    context.originalUrl = request.originalUrl = req.url;
    context.state = {};
    return context;
  }

  handleRequest (req, res) {
    const ctx = this.createContext(req, res)
    this.middleware(ctx)
  }

  listen (...args) {
    const server = http.createServer(
      this.handleRequest.bind(this)
    )
    server.listen(...args)
  }
}

module.exports = Application