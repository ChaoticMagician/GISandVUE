<template>
<div>
    <arcgismap :style="{height:thisheight}" style=" border: 1px solid #eee"/>
</div>
</template>

<script>
import arcgismap from '@/components/home/tilemap'
export default {
  name: 'home',
  components:{
    arcgismap,
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
  /* 这里是调整esri地图的css */
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
