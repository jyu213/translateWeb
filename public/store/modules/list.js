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
  }
}

// mutations
const mutations = {
  [types.RECEIVE_LISTS] (state, { lists }) {
    state.all = lists
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
