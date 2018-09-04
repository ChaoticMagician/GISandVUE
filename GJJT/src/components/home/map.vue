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
  beforeUpdate(){
    this.createView()
  },
  computed:{
    nowmapview:function(){
      return this.$store.state.mapview.newview;
    }
  },
  watch: {
    nowmapview:function(olddata,newdata){
        this.createView()
    }
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
