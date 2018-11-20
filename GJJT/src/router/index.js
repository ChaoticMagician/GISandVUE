import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'

import home from '@/components/home'
import test from '@/components/test'

import ModelMap from '@/components/home/modelmap'
import graphmap from '@/components/home/graphmap/graphmap'
import listmenu from '@/components/home/list'
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
          path: '/home',
          name: 'listmenu',
          component: listmenu
        },
        {
          path: '/home/default',
          name: 'default',
          component: ModelMap
        },
        {
          path: '/home/graphmap',
          name: 'graphmap',
          component: graphmap
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
