/**
 * 用户模块接口
 */
/**
 * Mocking client-server processing
 */
const lists = [{
  id: 1,
  name: 'author1'
}, {
  id: 2,
  name: 'author2'
}]

export default {
  getUserList (cb, errorCb) {
    setTimeout(() => cb(lists), 100)
    // const url = `/api/get-list`
    // fetch(url).then((response) => {
    //   if (response.ok) {
    //     response.json().then((data) => {
    //       console.log(data, typeof data)
    //       if (data.success) {
    //         cb(data.data)
    //       } else {
    //         typeof errorCb === 'function' && errorCb([])
    //       }
    //     })
    //   }
    // }).catch((err) => {
    //   typeof errorCb === 'function' && errorCb([], err)
    // })
  }
}
