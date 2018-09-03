import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'

import home from '@/components/home'
import permission from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'app',
      redirect: { name: 'login' }
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/permission',
      name: 'permission',
      component: permission
    }
  ]
})
