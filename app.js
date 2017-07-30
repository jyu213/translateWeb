const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const serve = require('koa-static')
const views = require('koa-views')

const path = require('path')
const PORT = process.env.PORT || 3000

const page = require('./src/routers/index')
const listAPI = require('./src/api/list')
const userAPI = require('./src/api/user')

// ctx.body解析
app.use(bodyParser())

// add session
app.keys = ['translate']
app.use(session({
  maxAge: 86400000
}, app))

// 静态资源
// @TODO: change staic path
app.use(serve(path.resolve(__dirname, './public')))

// 模板引擎
app.use(views(path.resolve(__dirname, './src/views'), {
  extension: 'ejs'
}))

// 装载所有子路由
let router = new Router()
router.use('/list', page.routes())
router.use('/api', listAPI.routes())
router.use('/api', userAPI.routes())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(PORT)
console.log(`app is starting at port ${PORT}`)
