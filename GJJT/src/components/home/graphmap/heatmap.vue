<template>
  <div class="heatmap" >
    <el-select
      class="heatmapSelect"
      size='small'
      v-model="thisLayer"
      value-key='id'
      placeholder="图层选择"
      @change='getfields'>
      <el-option
        v-for="item in onLayersConfig"
        :key="item.id"
        :label="item.title"
        :value="item"
        v-if="item.layerType==='Point'">
      </el-option>
    </el-select>
    <el-select
      class="heatmapSelect"
      size='small'
      v-model="thisRenderers"
      value-key='id'
      placeholder="图层样式">
      <el-option
        v-for="item in isRenderers"
        :key="item.id"
        :label="item.title"
        :value="item">
      </el-option>
    </el-select>
    <el-select
      class="heatmapSelect"
      size='small'
      v-model="thisfield"
      value-key='name'
      placeholder="加权字段"
      clearable
      :disabled='!thisLayer.id'>
      <el-option
        v-for="item in isfields"
        :key="item.name"
        :label="item.alias"
        :value="item.alias"
        v-if="item.type==='double'">
      </el-option>
    </el-select><span>*可选</span>
    <div class="heatmapSlider" >
      <span>渲染范围:</span>
      <el-slider
        v-model="renderersRange"
        :step='10'
        range
        show-stops
        :min="1"
        :max="500">
      </el-slider>
    </div>
    <div class="heatmapSlider" >
      <span>透明度:</span>
      <el-slider
        v-model="thisOpacity"
        :step='0.1'
        show-stops
        :max="1">
      </el-slider>
    </div>
    <el-button
      class="heatmapbutton"
      @click="addheatmaplayer">
      添加热力图
    </el-button>
    <el-button
      class="heatmapbutton"
      @click="remheatmaplayer">
      移除热力图
    </el-button>
  </div>
</template>

<script>
import * as esriLoader from 'esri-loader'
export default {
  name:'heatmap',
  props:[
    'thisview'
  ],
  data(){
    return{
      onLayersConfig: [],
      thisLayer: {},
      isRenderers: [{
        id:'default',
        title:'默认',
        colorStops:[
          { color: "rgba(63, 40, 102, 0)", ratio: 0 },
          { color: "rgba(63, 40, 102, 0)", ratio: 0.083 },
          { color: "#4e2d87", ratio: 0.166 },
          { color: "#563098", ratio: 0.249 },
          { color: "#5d32a8", ratio: 0.332 },
          { color: "#6735be", ratio: 0.415 },
          { color: "#7139d4", ratio: 0.498 },
          { color: "#7b3ce9", ratio: 0.581 },
          { color: "#853fff", ratio: 0.664 },
          { color: "#a46fbf", ratio: 0.747 },
          { color: "#c29f80", ratio: 0.830 },
          { color: "#e0cf40", ratio: 0.913 },
          { color: "#ffff00", ratio: 1 }]
      },
      {
        id:'color',
        title:'彩光',
        colorStops:[
          { color: "rgba(63, 40, 102, 0)", ratio: 0 },
          { color: "rgba(63, 40, 102, 0)", ratio: 0.083 },
          { color: "#A738F7", ratio: 0.166 },
          { color: "#5B38F7", ratio: 0.249 },
          { color: "#3898F7", ratio: 0.332 },
          { color: "#38F7F4", ratio: 0.415 },
          { color: "#38F7AE", ratio: 0.498 },
          { color: "#85F738", ratio: 0.581 },
          { color: "#BBF738", ratio: 0.664 },
          { color: "#F7F138", ratio: 0.747 },
          { color: "#EAB633", ratio: 0.830 },
          { color: "#F99268", ratio: 0.913 },
          { color: "#FF3F3F", ratio: 1 }]
      }],
      thisRenderers: {},
      isfields:[],
      thisfield:'',
      renderersRange:[0,200],
      thisOpacity:0.7,
      //geo功能对象集
      geoFunCollect:{},
      //数据转全局便于组件计算操作
      OverGraphics:{},
      heatmaplayer:{}
    }
  },
  created() {
    this.onLayersConfig = window.arcgis.layersList;
    esriLoader.loadModules([
      'esri/request',
      "/static/Toolsjs/geojsonDataToFeatureLayer.js",
    ]).then(([esriRequest,geojsonDataToFeatureLayer])=>{
      this.geoFunCollect = {esriRequest,geojsonDataToFeatureLayer}
    })
  },
  beforeDestroy() {
    if(this.thisview.map.findLayerById('heatmaplayer')){
      this.thisview.map.remove(this.heatmaplayer);
    }
  },
  methods:{
    getfields:function(layer){
      this.geoFunCollect.esriRequest(layer.featureInfoUrl,{responseType:"json"})
      .then((response) => {
        this.OverGraphics = this.geoFunCollect.geojsonDataToFeatureLayer.geojsonDataToGraphics(response.data);
        this.isfields = this.geoFunCollect.geojsonDataToFeatureLayer.getfields(this.OverGraphics);
      })
    },
    addheatmaplayer(){
      if(this.thisLayer.id&&this.thisRenderers.id){
        if(this.thisview.map.findLayerById('heatmaplayer')){
          this.thisview.map.remove(this.heatmaplayer);
        }
        this.heatmaplayer = this.geoFunCollect.geojsonDataToFeatureLayer.GraphicsToFeatureLayer(
          this.OverGraphics,
          'heatmaplayer',
          '热力图层',
          this.thisOpacity,
          true,
          false,
          {
            type: "heatmap",
            colorStops:this.thisRenderers.colorStops,
            minPixelIntensity: this.renderersRange[0],
            maxPixelIntensity: this.renderersRange[1],
          }
        )
        this.thisview.map.add(this.heatmaplayer);
      }else{
        this.$message({message: '请至少选择数据图层及图层样式'});
      }
    },
    remheatmaplayer(){
      this.thisview.map.remove(this.heatmaplayer);
    }
  }
}
</script>

<style scoped>
  .heatmap{
    padding:0 12px;
  }
  .heatmapSelect{
    padding: 0 0 10px 0 ;
  }
  .heatmapSlider{
    padding: 0 0 10px 0 ;
  }
  .heatmapbutton{
    margin-left: 15px;
  }
</style>
