const Koa = require('koa')

const app = new Koa();

app.use((ctx) => {
  // ctx.body = 'hello'
  throw new Error('xxx')
})

app.on('error', (err) => {
  console.log('err')
})

app.listen(3000)

