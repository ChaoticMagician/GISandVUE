<template>
<div>
    <listmenu id="list-all"></listmenu>
    <!-- <p><button @click="chancemapmodel" >改变</button> </p> -->
      <keep-alive>
        <router-view>
          <arcgismap :style="{height:thisheight}" style=" border: 1px solid #eee" slot-scope="mapinfo"  :my-base-map='mapinfo.myBaseMap' />
        </router-view>
      </keep-alive>
</div>
</template>

<script>
import arcgismap from '@/components/home/map'
import listmenu from '@/components/home/list'
export default {
  name: 'home',
  components:{
    arcgismap,listmenu
  },
  data () {
    return {
      thisheight:'',
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
