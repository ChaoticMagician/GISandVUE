<template>
<div>
    <listmenu id="list-all"></listmenu>
      <model-map>
        <arcgismap :style="{height:thisheight}" style=" border: 1px solid #eee" slot-scope="mapinfo"  :my-base-map='mapinfo.myBaseMap' />
      </model-map>
    <router-view>
    </router-view>
</div>
</template>

<script>
import arcgismap from '@/components/home/map'
import ModelMap from '@/components/home/modelmap'

import listmenu from '@/components/home/list'
export default {
  name: 'home',
  components:{
    arcgismap,ModelMap,listmenu
  },
  data () {
    return {
      thisheight:''
    }
  },
  mounted:function(){
    this.thisheight = (window.innerHeight-2)+'px'
  }

}
</script>
<style >
#app{
  height: 100%;
  width: 100%;
}
#list-all{
    position: fixed;
    z-index: 12;
    width: 130px;
    top: 120px;
    left: 15px;
}
</style>
