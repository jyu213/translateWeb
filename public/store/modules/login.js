import user from '../../apis/user'
import * as types from '../mutations'

// initial state
const state = {
  username: ''
}

// getters
const getters = {
  username: state => state.username
}

// actions
const actions = {
  login ({commit}, params) {
    return new Promise((resolve, reject) => {
      user.login(params).then((data) => {
        console.log('user login', data)
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
        console.log(data, 'get user data')
        commit(types.RECEIVE_USER_LOGIN, {data})
        resolve(data)
      }).catch((err) => {
        console.log(err)
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
  },
  [types.FAILS_USER_LOGIN] (state, {data}) {
    console.log('user login fails')
    state.username = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
