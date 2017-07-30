const Router = require('koa-router')
const user = require('../services/user')
let api = new Router()

/**
 * 取用户列表
 *
 * @Method: GET
 */
api.get('/user/list', async (ctx) => {
  try {
    let data = await user.list()
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

/**
 * 新增用户
 *
 * @Method: POST
 * @param {String} username, 用户名
 * @param {String} password, 密码
 */
api.post('/user/add', async (ctx) => {
  const params = ctx.request.body

  console.log(params, 'user api')
  const data = await user.create(params)
  try {
    ctx.session.user = params.username
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

/**
 * 校验用户是否存在
 *
 * @Method: GET
 * @param {String} username
 */
api.get('/user/check', async (ctx) => {
  const {username} = ctx.query
  try {
    let data = await user.isExist({username})

    console.log(ctx.session)
    ctx.body = {
      success: data.length > 0,
      message: '',
      data: data
    }
  } catch (err) {
    console.log(err, 'ee')
    ctx.body = {
      success: false,
      message: err,
      data: []
    }
  }
})

api.get('/user/login', async (ctx) => {
  const {username, password} = ctx.query
  try {
    let data = await user.isExist({username, password})
    console.log(username, ':api user login username ')
    console.log(ctx, ctx.session)

    // ctx.cookies.set('koa:sess', username, {
    //   maxAge: 1296000000,
    //   path: '/',
    //   httpOnly: false
    // })
    ctx.session.user = username

    ctx.body = {
      success: data.length > 0,
      message: '',
      data: data
    }
  } catch (err) {
    console.log(err, ' a')
    ctx.body = {
      success: false,
      message: err,
      data: []
    }
  }
})

api.get('/user/get', async (ctx) => {
  console.log(ctx.session, 'get user')
  if (ctx.session.user) {
    ctx.body = {
      success: true,
      data: [{
        username: ctx.session.user
      }]
    }
  } else {
    ctx.body = {
      success: false,
      data: []
    }
  }
})

module.exports = api
