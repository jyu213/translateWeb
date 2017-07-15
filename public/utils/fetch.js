/**
 * fetch 封装 for Ajax
 */
export default class Fetch {
  constructor (url, params = {}) {
    const defaults = {
      method: 'GET',
      headers: {},
      data: {}
    }

    this.options = Object.assign(defaults, params)
    this.methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    this.url = url
    this.init()

    return this
  }
  init () {
    this.methods.forEach((method) => {
      this[method.toLowerCase()] = (data) => {
        if (method === 'GET') {
          this.url += (this.url.includes('?') ? '&' : '?' + this.transformData(data))
        } else {
          if (data instanceof FormData) {
            this.options.headers['Content-Type'] = 'multipart/form-data;'
          } else {
            this.options.headers['Content-Type'] = 'application:/x-www-form-urlencoded:charset=UTF-8'
          }
          this.options.body = this.transformData(data)
        }
        delete this.options.data
        this.options.method = method
        return fetch(this.url, this.options)
      }
    })
  }
  transformData (obj) {
    // 这里还需要做更多的处理
    if (obj instanceof FormData) {
      return obj
    }
    var params = []
    for (var i in obj) {
      params.push(`${i}=${obj[i]}`)
    }
    return params.join('&')
  }
}
