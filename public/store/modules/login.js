import user from '../../apis/user'
import * as types from '../mutations'

// initial state
const state = {
  username: ''
  // userId: ''
}

// getters
const getters = {
  username: state => state.username
  // userId: state => state.userId
}

// actions
const actions = {
  login ({commit}, params) {
    return new Promise((resolve, reject) => {
      user.login(params).then((data) => {
        commit(types.RECEIVE_USER_LOGIN, {data})
        resolve(data)
      }).catch((err) => {
        commit(types.FAILS_USER_LOGIN, {err})
        reject(err)
      })
    })
  },

  getUser ({commit}) {
    return new Promise((resolve, reject) => {
      user.getUser().then((data) => {
        commit(types.RECEIVE_USER_LOGIN, {data})
        resolve(data)
      }).catch((err) => {
        commit(types.FAILS_USER_LOGIN, {err})
        reject(err)
      })
    })
  }
}

// mutations
const mutations = {
  [types.RECEIVE_USER_LOGIN] (state, {data}) {
    console.log('user login success:', data)
    state.username = data[0].username
    // state.userId = data[0].userId
  },
  [types.FAILS_USER_LOGIN] (state, {data}) {
    console.log('user login fails')
    state.username = ''
    // state.userId = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
