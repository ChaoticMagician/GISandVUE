// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import esriLoader from 'esri-loader'
import { arcgisConfig } from '@/map/mapConfig.js'

//配置esri-loader的arcgis for js的API。本处为全局配置。
//可以在各组件例面配置，意味着不同组件可以应用不同的API
arcgisConfig();
esriLoader.loadScript({url:window.arcgis.config.baseUrl})
//配置element组件
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
