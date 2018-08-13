import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/Index'

import firstMap from '@/components/firstMap'
import basemap from '@/components/basemap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/',
          name: 'redirect',
          redirect: { name: 'Basemap' }
        },
        {
          path: '/basemap',
          name: 'Basemap',
          component: basemap
        },
        {
          path: '/tileLayer',
          name: 'TileLayer',
          component: firstMap
        },
        {
          path: '/drawModel',
          name: 'DrawModel',
          component: firstMap
        },
        {
          path: '/baseTileLayer',
          name: 'BaseTileLayer',
          component: firstMap
        }
      ]
    }
  ]
})
