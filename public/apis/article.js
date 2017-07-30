/**
 * Mocking client-server processing
 */
const headers = new Headers()
headers.append('Content-Type', 'application/json')

export default {
  getLists (cb, errorCb) {
    const url = `/api/article/list`
    fetch(url, {credentials: 'include'}).then((response) => {
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
      headers: headers,
      credentials: 'include',
      body: JSON.stringify(params)
    }).then((response) => {
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
  }
}