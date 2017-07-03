const Router = require('koa-router')
const createList = require('../services/get_list')
let api = new Router()

api.get('/get-list', async (ctx) => {
  try {
    let data = await createList.list()
    ctx.body = {
      success: true,
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

module.exports = api
