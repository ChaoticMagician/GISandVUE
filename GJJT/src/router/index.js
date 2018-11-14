import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'

import home from '@/components/home'
import test from '@/components/test'

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
          path: '/home/default',
          name: 'default',
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
      path: '/test',
      name: 'test',
      component: test
    }
  ]
})
