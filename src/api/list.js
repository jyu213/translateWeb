const Router = require('koa-router')
const article = require('../services/article')
let api = new Router()

api.get('/article/list', async (ctx) => {
  try {
    let data = await article.list()

    // ctx.cookies.set('key', 'value', {
    //   maxAge: 10 * 60 * 1000,
    //   httpOnly: false,
    //   domain: 'h5.lu.com',
    //   expires: new Date('2018-02-15'),
    //   key: 'koa:sess',
    //   overwrite: false,
    // });

    console.log(ctx.session, 'user')
    // console.log(ctx.cookies.get('key'))
    ctx.body = {
      success: true,
      message: 'success',
      data: data
    }
  } catch (err) {
    ctx.body = {
      success: false,
      message: err,
      data: []
    }
  }
})

api.post('/article/add', async (ctx) => {
  // @TODO: check params
  const params = ctx.request.body
  const data = await article.create(params)
  try {
    ctx.body = {
      success: true,
      message: 'success',
      data: data
    }
  } catch (err) {
    ctx.body = {
      success: false,
      message: err
    }
  }
})

module.exports = api
