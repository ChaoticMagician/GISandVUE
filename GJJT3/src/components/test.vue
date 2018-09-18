<template>
    <div>
      <p><button @click="thischance()">改变</button></p>
        <arcgismap :style="{height:thisheight}"
         style=" border: 1px solid #eee"
         :this-base-map='thisBaseMap'
         ref="chancemap"
        />
    </div>
</template>

<script>
import * as esriLoader from 'esri-loader'
import arcgismap from '@/components/home/tilemap'

export default {
  name: 'test',
  components:{
    arcgismap
  },
  data () {
    return {
      thisheight:'',
      thiscomponent:'oneBaseMap',
      thisBaseMap:{},
      oneBaseMap:{},
      tweBaseMap:{}
    }
  },
  created:function(){
    this.createMap1();

    this.thisheight = (window.innerHeight-2)+'px';
  },
  methods:{
    createMap1 () {
      //这是esri-loader选项配置，本处是配置dojoconfig
      esriLoader.loadModules([
        "esri/Map"
      ]).then(([Map]) => {
        // map代码开始锚点
        //定义地图
        var map1 = new Map({
          // basemap: customBasemap,
          basemap: "streets"
        });
        this.thisBaseMap = map1;

        console.log(map1);
      })
    },
    createMap2 () {
      //这是esri-loader选项配置，本处是配置dojoconfig
      esriLoader.loadModules([
        "esri/Map"
      ]).then(([Map]) => {
        // map代码开始锚点
        //定义地图
        var map2 = new Map({
          // basemap: customBasemap,
          basemap: "dark-gray"
        });
        this.thisBaseMap = map2;
        console.log(map2);
      })
    },
    thischance(){
      this.createMap2();
      console.log(this.thisBaseMap);
      this.$refs.chancemap.createView()
    }
  }
}
</script>
<style >
#list-all{
    position: fixed;
    z-index: 12;
    width: 130px;
    top: 120px;
    left: 15px;
}
</style>
