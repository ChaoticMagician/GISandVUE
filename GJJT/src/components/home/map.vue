<template>
  <div class="eleMap" style="height: 100%;">
    <div id="viewDiv"></div>
  </div>
</template>

<script>
import * as esriLoader from 'esri-loader'
export default {
  name: 'tilemap',
  props:  {
    myBaseMap:{}
  },
  data () {
    return {
        thismap: Object,
        thisview: Object,
    }
  },
  mounted () {
    this.createMap();
    this.createView();

  },
  methods: {
    createMap () {
      //这是esri-loader选项配置，本处是配置dojoconfig
      const options = {
        dojoConfig:{
          has:{
            "esri-featurelayer-webgl": 1
          }
        }
      };
      // 引入依赖
      // esriLoader.loadModules([
      //   "esri/Map",
      //   "esri/Basemap",
      //   "esri/views/MapView",
      //   "esri/layers/WebTileLayer",
      //   "dojo/domReady!"
      // ]).then(([Map,Basemap,MapView,WebTileLayer]) => {
      //   // map代码开始锚点
      //   var tdtLayer = new WebTileLayer({
      //     urlTemplate: "http://{subDomain}.tianditu.com/DataServer?T=vec_w&x={col}&y={row}&l={level}",
      //     subDomains: ["t0","t1","t2","t3","t4","t5","t6","t7"],
      //     copyright: "天地图"
      //   });
      //   var customBasemap = new Basemap({
      //     baseLayers: [tdtLayer],
      //     title: "Custom Basemap",
      //     id: "myBasemap"
      //   });
      //   // //定义地图
      //   var map = new Map({
      //     basemap: customBasemap,
      //     // basemap: "streets"
      //   });
      //   this.thismap = map;
      //map代码结束锚点-
      // }) 
    },
    createView () {
      // 引入依赖
      esriLoader.loadModules([
        "esri/views/MapView",
        "dojo/domReady!"
      ]).then(([MapView]) => {
        var view = new MapView({
          map: this.myBaseMap,
          container: "viewDiv",
          zoom:6,
          center:[113,32]
        });
        this.thisview = view;
      })
    },
  }
}
</script>

<style scoped>
  #viewDiv {
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
  }

</style>
