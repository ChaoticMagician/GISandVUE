import Vue from 'vue'
import Vuex from 'vuex'

import mapview from './mapview'

Vue.use(Vuex);


export default new Vuex.Store({
    modules:{
        mapview
    }
})