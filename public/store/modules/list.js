import article from '../../apis/article'
import * as types from '../mutations'

// initial state
const state = {
  all: []
}

// getters
const getters = {
  getLists: state => state.all
}

// actions
const actions = {
  getLists ({ commit }, params) {
    // @TODO: reset params
    article.getLists({page: 50}, (lists) => {
      commit(types.RECEIVE_LISTS, {lists})
    })
  },
  updateArticle ({ commit }, params) {
    article.updateArticle(params, (data) => {
      commit(types.UPDATE_ARTICLE, {data})
    })
  }
}

// mutations
const mutations = {
  [types.RECEIVE_LISTS] (state, { lists }) {
    state.all = lists
  },
  [types.UPDATE_ARTICLE] (state, { data }) {
    // @TODO: check
    state.update = data;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
