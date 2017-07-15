import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/List'
import Upload from '@/components/Upload'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/list',
    name: 'list',
    component: List
  }, {
    path: '/upload',
    name: 'upload',
    component: Upload
  }]
})
