const Router = require('koa-router')
const article = require('../services/article')
const user = require('../services/user')
let api = new Router()

api.get('/article/list', async (ctx) => {
  try {
    let data = await article.list()

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

api.patch('/article/update', async (ctx) => {
  let params = ctx.request.body
  const {id, username} = params
  let {author} = params

  if (typeof id === 'undefined') {
    ctx.body = {
      success: false,
      message: '缺失 ID',
      data: []
    }
  }
  // @FIX: pass username instend of userId
  if (username && typeof author === 'undefined') {
    const userData = await user.isExist({username})
    if (userData.length > 0) {
      params = Object.assign(params, {
        author: userData[0].id
      })
    }
  }

  try {
    await article.update(id, params)

    ctx.body = {
      success: true,
      message: '',
      data: []
    }
  } catch (err) {
    ctx.body = {
      success: false,
      message: err,
      data: []
    }
  }
})

module.exports = api
