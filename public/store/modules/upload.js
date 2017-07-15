import user from '../../apis/user'
import article from '../../apis/article'
import * as types from '../mutations'

// initial state
const state = {
  authorList: []
}

// getters
const getters = {
  getAuthorList: state => state.authorList,
  getAddSuccess: state => state.addSuccess
}

// actions
const actions = {
  getAuthorList ({ commit }) {
    console.log(commit)
    user.getUserList((data) => {
      console.log(data)
      commit(types.RECEIVE_USER_LISTS, {data})
    })
  },
  addArticle ({commit}, params) {
    article.addArticle(params, (data) => {
      commit(types.RECEIVE_ARTICLE_ADD, {data})
    }, (err) => {
      commit(types.FAILS_ARTICLE_ADD, {err})
    })
  }
}

// mutations
const mutations = {
  [types.RECEIVE_USER_LISTS] (state, {data}) {
    state.authorList = data
  },
  [types.RECEIVE_ARTICLE_ADD] (state, {data}) {
    state.addSuccess = true
  },
  [types.FAILS_ARTICLE_ADD] (state, {data}) {
    state.addSuccess = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
