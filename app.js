const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')
const views = require('koa-views')

const path = require('path')
const PORT = process.env.PORT || 3000

const page = require('./src/routers/index')
const api = require('./src/api/list')

// 装载所有子路由
let router = new Router()
router.use('/list', page.routes(), page.allowedMethods())
router.use('/api', api.routes())

// ctx.body解析
app.use(bodyParser())

// 静态资源
// @TODO: change staic path
app.use(serve(path.resolve(__dirname, './public')))

// 模板引擎
app.use(views(path.resolve(__dirname, './src/views'), {
  extension: 'ejs'
}))
// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(PORT)
console.log(`app is starting at port ${PORT}`)
