<template>
    <div id="home-slot"  >
        <slot :myBaseMap='myBaseMap' >
            <p>地图组件加载失败</p>
        </slot>
    </div>
</template>

<script>
import * as esriLoader from 'esri-loader'
export default {
    name:'modelmap',
    data(){
        return{
            myBaseMap:{}
        }
    },
  mounted:function(){
    this.createMap();
  },
  methods: {
    createMap () {
      //这是esri-loader选项配置，本处是配置dojoconfig
      esriLoader.loadModules([
        "esri/Map"
      ]).then(([Map]) => {
        // map代码开始锚点
        //定义地图
        var map = new Map({
          // basemap: customBasemap,
          basemap: "streets"
        });
        this.myBaseMap = map;
      })
    }
  }
}
</script>

<style >
  #home-slot {
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
  }


  /* 这里是调整esri地图的css */
  .esri-ui-top-left {
    top: 0;
    right: 0;
    left: auto;
  }
  .esri-ui .esri-attribution {
    height: 0px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .esri-attribution__powered-by {
    width: 0px;
    font-weight: 400;
    padding: 0 5px;
    text-align: right;
    white-space: nowrap;
    align-self: flex-end;
  }
</style>
