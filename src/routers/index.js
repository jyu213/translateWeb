const Router = require('koa-router')
let router = new Router()

router.get('/', async (ctx) => {
  const title = `hello`

  await ctx.render('index', {
    title
  })
})

module.exports = router
