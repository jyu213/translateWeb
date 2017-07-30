import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// import * as getters from './getters'
import list from './modules/list'
import upload from './modules/upload'
import register from './modules/register'
import login from './modules/login'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  // actions,
  // getters,
  modules: {
    list,
    upload,
    register,
    login
  },
  strict: debug
})
