/**
 * Mocking client-server processing
 */
export default {
  getLists (cb, errorCb) {
    const url = `/api/article/list`
    fetch(url).then((response) => {
      return response.json()
    }).then((result) => {
      console.log(result, typeof result)
      if (result.success) {
        typeof cb === 'function' && cb(result.data)
      } else {
        typeof errorCb === 'function' && errorCb()
      }
    }).catch((err) => {
      typeof errorCb === 'function' && errorCb([], err)
    })
  },
  addArticle (params, cb, errorCb) {
    const url = `/api/article/add`

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(params)
    }).then((responese) => {
      return responese.json()
    }).then((result) => {
      console.log(result, typeof result)
      if (result.success) {
        typeof cb === 'function' && cb(result.data)
      } else {
        typeof errorCb === 'function' && errorCb()
      }
    }).catch((err) => {
      typeof errorCb === 'function' && errorCb([], err)
    })
  }
}
