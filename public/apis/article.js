/**
 * Mocking client-server processing
 */
const headers = new Headers()
headers.append('Content-Type', 'application/json')

export default {
  getLists (params, cb, errorCb) {
    const query = Object.keys(params).map((item) => {
      return `${encodeURIComponent(item)}=${encodeURIComponent(params[item])}`
    }).join('&')
    const url = `/api/article/list?${query}`

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
  },
  updateArticle (params, cb, errorCb) {
    const url = `/api/article/update`

    let promise = new Promise((resolve, reject) => {
      fetch(url, {
        method: 'PATCH',
        headers,
        credentials: 'include',
        body: JSON.stringify(params)
      }).then((response) => {
        return response.json()
      }).then((result) => {
        if (result.success) {
          resolve(result.data)
        } else {
          reject({
            success: false
          })
        }
      }).catch(() => {
        reject({
          success: false
        })
      })
    })
    return promise
  }
}
