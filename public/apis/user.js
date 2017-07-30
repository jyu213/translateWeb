/**
 * 用户模块接口
 */
const headers = new Headers()
headers.append('Content-Type', 'application/json')

export default {
  getUserList (cb, errorCb) {
    const url = `/api/user/list`
    fetch(url, {credentials: 'include'}).then((response) => {
      return response.json()
    }).then((result) => {
      if (result.success) {
        cb(result.data)
      } else {
        typeof errorCb === 'function' && errorCb([])
      }
    }).catch((err) => {
      typeof errorCb === 'function' && errorCb([], err)
    })
  },
  // @TODO: switch to promise
  isExist (username) {
    const url = `/api/user/check?username=${username}`
    let promise = new Promise((resolve, reject) => {
      fetch(url, {credentials: 'include'}).then((response) => {
        return response.json()
      }).then((result) => {
        if (!result.success) {
          resolve(result.data)
          // cb(result.data)
        } else {
          reject([])
          // typeof errorCb === 'function' && errorCb([])
        }
      }).catch(() => {
        reject([])
        // typeof errorCb === 'function' && errorCb([], err)
      })
    })
    return promise
  },
  addUser (params, cb, errorCb) {
    const url = `/api/user/add`

    let promise = new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        headers: headers,
        credentials: 'include',
        body: JSON.stringify(params)
      }).then((response) => {
        return response.json()
      }).then((result) => {
        if (result.success) {
          resolve(result.data)
          // cb(result.data)
        } else {
          reject([])
          // typeof errorCb === 'function' && errorCb([])
        }
      }).catch(() => {
        reject([])
        // typeof errorCb === 'function' && errorCb([], err)
      })
    })
    return promise
  },
  login (params, cb, errorCb) {
    const url = `/api/user/login?username=${params.username}&password=${params.password}`

    let promise = new Promise((resolve, reject) => {
      fetch(url, {credentials: 'include'}).then((response) => {
        return response.json()
      }).then((result) => {
        if (result.success) {
          resolve(result.data)
        } else {
          reject([])
        }
      }).catch(() => {
        reject([])
      })
    })
    return promise
  },
  getUser (cb, errorCb) {
    const url = `/api/user/get`
    let promise = new Promise((resolve, reject) => {
      fetch(url, {credentials: 'include'}).then((response) => {
        return response.json()
      }).then((result) => {
        if (result.success) {
          resolve(result.data)
        } else {
          reject({})
        }
      }).catch(() => {
        reject({})
      })
    })
    return promise
  }
}
