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
    thisBaseMap:{}
  },
  data () {
    return {
      thismap: Object,
      thisview: Object,
    }
  },
  watch: {
    thisBaseMap:function(olddata,newdata){
      if(newdata)
        this.createView()
    },
    deep: true
  },
  methods: {
    createView () {
      //这是esri-loader选项配置，本处是配置dojoconfig
      const options = {
        dojoConfig:{
          has:{
            "esri-featurelayer-webgl": 1
          }
        }
      };
      // 引入依赖
      esriLoader.loadModules([
        "esri/views/MapView",
        "esri/geometry/Extent",
        "dojo/domReady!"
      ]).then(([MapView,Extent]) => {
        var view = new MapView({
          map: this.thisBaseMap,
          container: "viewDiv",
          zoom:6,
        });
        // //设置显示的最大层级
        // view.constraints = {
        //   minZoom: 6, 
        //   rotationEnabled: false  // Disables map rotation
        // };
        //设置初始显示范围
        view.extent = new Extent({
          xmin: 116.60,
          ymin: 38.62,
          xmax: 118.19,
          ymax: 39.24,
          spatialReference: {
            wkid: 4326
          }
        })
        this.thisview = view;
        console.log(this.thisview);
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
