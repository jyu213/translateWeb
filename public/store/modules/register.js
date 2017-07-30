import user from '../../apis/user'
import * as types from '../mutations'

// initial state
const state = {
  // authorList: []
}

// getters
const getters = {
  addUser: state => state.addUser
}

// actions
const actions = {
  addUser ({commit}, params) {
    return new Promise((resolve, reject) => {
      user.isExist(params.username).then(() => {
        return user.addUser(params)
      }).then((data) => {
        console.log(data, 'action')
        commit(types.RECEIVE_USER_ADD, {data})
        resolve()
      }).catch((err) => {
        console.log(err, 'action')
        commit(types.FAILS_USER_ADD, {err})
        reject()
      })

      // user.isExist(params.username, () => {
      //   console.log('isExist', arguments)
      //   user.addUser(params, (data) => {
      //     console.log(data, 'action')
      //     commit(types.RECEIVE_USER_ADD, {data})
      //   }, (err) => {
      //     console.log(err, 'action')
      //     commit(types.FAILS_USER_ADD, {err})
      //   })
      // }, (error) => {
      //   console.log(error, 'err')
      //   // commit(types.USER_ISEXIST, {error})
      // })
    })
  }
  // checkUser ({commit}, username) {
  //   user.isExist(username)
  //   commit()
  // }
}

// mutations
const mutations = {
  [types.RECEIVE_USER_ADD] (state, {data}) {
    state.addSuccess = true
  },
  [types.FAILS_USER_ADD] (state, {data}) {
    state.addSuccess = false
  },
  [types.USER_ISEXIST] (state, {data}) {
    state.userIsExist = true
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
