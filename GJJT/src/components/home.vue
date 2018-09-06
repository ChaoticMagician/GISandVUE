<template>
<div>
    <listmenu id="list-all"></listmenu>

    <router-view>
      <arcgismap :style="{height:thisheight}" style=" border: 1px solid #eee" slot-scope="mapinfo"  :this-base-map='mapinfo.myBaseMap' />
    </router-view>

</div>
</template>

<script>
import arcgismap from '@/components/home/tilemap'
import listmenu from '@/components/home/list'

import ModelMap from '@/components/home/modelmap'
import retuarnMap from '@/components/home/retuarnMap'
export default {
  name: 'home',
  components:{
    arcgismap,listmenu,ModelMap,retuarnMap
  },
  data () {
    return {
      thisheight:'',
    }
  },
  mounted:function(){
    this.thisheight = (window.innerHeight-2)+'px';
  },
  methods:{
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
