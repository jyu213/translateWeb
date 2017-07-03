import list from '../../apis/list'
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
  getLists ({ commit }) {
    console.log(list)
    list.getLists((lists) => {
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
