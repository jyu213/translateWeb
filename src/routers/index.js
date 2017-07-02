const Router = require('koa-router')
let list = new Router()

list.get('/', async (ctx) => {
  const title = `hello`

  await ctx.render('list', {
    title
  })
})

module.exports = list
