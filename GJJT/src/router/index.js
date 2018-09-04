import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'

import home from '@/components/home'
import permission from '@/components/login'

import ModelMap from '@/components/home/modelmap'
import retuarnMap from '@/components/home/retuarnMap'

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
      component: home,
      children:[
        {
          path: '/home/defaule',
          name: 'defaule',
          component: ModelMap
        },
        {
          path: '/home/returnmap',
          name: 'returnMap',
          component: retuarnMap
        }
      ]
    },
    {
      path: '/permission',
      name: 'permission',
      component: permission
    }
  ]
})
