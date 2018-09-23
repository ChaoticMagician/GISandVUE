import Vue from 'vue'
import Router from 'vue-router'

import Indexru from '@/components/Index'

import firstMap from '@/components/firstMap'
import basemap from '@/components/basemap'
import AddLabelsFeatureLayer from '@/components/AddLabelsFeatureLayer'
import heatmap from '@/components/heatmap'
import scenemap from '@/components/scenemap'
import ViewGoto from '@/components/ViewGoto'
import F2DTo3D from '@/components/F2DTo3D'
import groundDemo from '@/components/groundDemo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Indexru,
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
          path: '/scenemap',
          name: 'scenemap',
          component: scenemap
        },
        {
          path: '/ViewGoto',
          name: 'ViewGoto',
          component: ViewGoto
        },
        {
          path: '/F2DTo3D',
          name: 'F2DTo3D',
          component: F2DTo3D
        },
        {
          path: '/groundDemo',
          name: 'groundDemo',
          component: groundDemo
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
