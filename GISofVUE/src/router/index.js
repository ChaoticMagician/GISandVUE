import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/Index'

import firstMap from '@/components/firstMap'
import basemap from '@/components/basemap'
import AddLabelsFeatureLayer from '@/components/AddLabelsFeatureLayer'
import heatmap from '@/components/heatmap'



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
          path: '/AddLabelsFeatureLayer',
          name: 'AddLabelsFeatureLayer',
          component: AddLabelsFeatureLayer
        },
        {
          path: '/heatmap',
          name: 'heatmap',
          component: heatmap
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
