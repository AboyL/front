const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs').promises; // 获取promise方法
const { createReadStream, createWriteStream, readFileSync } = require('fs');
const chalk = require('chalk');

class Server {
  constructor(options) {
    this.port = options.port;
    this.directory = options.directory;
    this.cache = options.cache;
  }
  async handleRequest (req, res) {
    let { pathname } = url.parse(req.url);
    pathname = decodeURIComponent(pathname); // decode 解码
    // 列出所有的文件夹
    let requestUrl = path.join(this.directory, pathname); // 路径带/的不要用resolve会回到根路径
    console.log(requestUrl)
    res.end()
  }
  start () {
    // async + awai
    // http.createServer(()=>this.handleRequest())
    const server = http.createServer(this.handleRequest.bind(this));
    server.listen(this.port, () => {
      console.log(`${chalk.yellow('Starting up http-server, serving')}`);
      console.log(`  http://127.0.0.1:${chalk.green(this.port)}`)
    });
  }
}
module.exports = Server;


