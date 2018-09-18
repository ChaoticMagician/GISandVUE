<template>
  <div class="eleMap" style="height: 100%;">
    <div id="viewDiv"></div>
    <!-- <el-row type='flex' id='toolsList'> -->
      <div id='toolsList'  >
        <div class="toolsListDiv" id="biger"><i class="toolsLIstIcon iconfont icon-fangda"/>放大</div>
        <div class="toolsListDiv" id="litter"><i class="toolsLIstIcon iconfont icon-suoxiao1"></i>缩小</div>
        <div class="toolsListDiv" id="allmap"><i class="toolsLIstIcon iconfont icon-fangda1"></i>全图</div>
        <div class="toolsListDiv" id="query"><i class="toolsLIstIcon iconfont icon-ditu1"></i>查询</div>
        <div class="toolsListDiv" id="long"><i class="toolsLIstIcon iconfont icon-dituchizi"></i>长度</div>
        <div class="toolsListDiv" id="area"><i class="toolsLIstIcon iconfont icon-ditu1"></i>面积</div>
        <div class="toolsListDiv" id="legend"><i class="toolsLIstIcon iconfont icon-ditudaohang-"></i>图例</div>
        <div class="toolsListDiv" id="remove"><i class="toolsLIstIcon iconfont icon-ditu"></i>清除</div>
      </div>
      <div id='layersList' @mouseleave.stop.self="chancelistcomponent(null,'baseMapList',$event)">
        <div @mouseenter.stop.self="chancelistcomponent(1,'baseMapList')" :class="['layersListDiv',whichListIs==1? 'layersListDivIs':'']" id='baseMapList' ><i class="workLIstIcon iconfont icon-fangda"></i>底图切换</div>
        <div @mouseenter.stop.self="chancelistcomponent(2,'layerList')" :class="['layersListDiv',whichListIs==2? 'layersListDivIs':'']" id="layerList"><i class="workLIstIcon iconfont icon-suoxiao1"></i>图层控制</div>
        <div @mouseenter.stop.self="chancelistcomponent(3,'tameList')" :class="['layersListDiv',whichListIs==3? 'layersListDivIs':'']" id="tameList"><i class="workLIstIcon iconfont icon-fangda1"></i>实时数据</div>
          <keep-alive>
            <component 
            :is="listcomponent"
            v-if="whichListIs"
            @chance-basemap-even='chanceBasemap'
            @chance-layers-even='chancelayers'
            class="layersListPopup"></component>
          </keep-alive>
      </div>
  </div>
</template>

<script>
import * as esriLoader from 'esri-loader'
import baseMapList from '@/components/home/layersList/baseMapList'
import layerList   from '@/components/home/layersList/layerList'
import tameList    from '@/components/home/layersList/tameList'
export default {
  name: 'tilemap',
  components:{
    baseMapList,layerList,tameList
  },
  data () {
    return {
      BasemapObjArr: Object,
      thisview: Object,
      thismap: Object,
      layerListEvent:{},

      listcomponent:'baseMapList',
      whichListIs: null
    }
  },
  mounted(){
    this.createView()
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
        "esri/Map",
        "esri/Basemap",
        "esri/layers/WebTileLayer",
        "esri/geometry/SpatialReference",
        "esri/layers/MapImageLayer",

        "esri/views/MapView",
        "esri/geometry/Extent",
        "esri/widgets/Zoom",
        "dojo/domReady!"
      ]).then(([Map,Basemap,WebTileLayer,SpatialReference,MapImageLayer,
        MapView,Extent,Zoom]) => {
        //加载所有的WebTileLayer图层
        let onThisBaseLayers = window.arcgis.baseLayers;
        let webTileLayerObjArr = {};
        for(var key in onThisBaseLayers ){
          if(onThisBaseLayers[key].type == 1){
            let webTileLayerObj = new WebTileLayer(onThisBaseLayers[key].config);
              webTileLayerObjArr[onThisBaseLayers[key].config.id] = webTileLayerObj;
            }
        }(key);
        //依据配置文件将WebTileLayer图层，组成baseMap
        let onThisBaseMapList = window.arcgis.baseMapList;
        let BasemapObjArr = {};
        onThisBaseMapList.forEach(thisObj => {
          let baseLayers = [];
          thisObj.baseLayers.forEach(thisObj =>{
            baseLayers[baseLayers.length] = webTileLayerObjArr[thisObj];
          })

          let BasemapObj = new Basemap({
            id: thisObj.id,
            title: thisObj.title,
            baseLayers: baseLayers
          });
          BasemapObjArr[thisObj.key] = BasemapObj;
        });
        this.BasemapObjArr = BasemapObjArr;
        //依据配置文件创建layers对象
        let onLayersConfig = window.arcgis.layersList;
        let layersArr = [];
        onLayersConfig.forEach(tram => {
          if(tram.type == "map-image"){
            let ImageLayer = new MapImageLayer({
              id: tram.id,
              title: tram.title,
              url: tram.url,
              opacity: tram.opacityd,
              visible: tram.visible
            });
            layersArr.push(ImageLayer);
          }
        });
        // 创建map对象
        let map = new Map({
          basemap:  BasemapObjArr.difault,
          layers:   layersArr
        });
        //依据传进来的map获取创建视图
        var view = new MapView({
          // map: this.thisBaseMap,
          map: map,
          container: "viewDiv",
          zoom:6,
        });
        //设置显示的最大层级
        view.constraints = {
          maxZoom: 16,
          minZoom: 0, 
          rotationEnabled: false  // Disables map rotation
        };
        //设置初始显示范围
        var extent = new Extent({
          xmin: 116.60,
          ymin: 38.62,
          xmax: 118.19,
          ymax: 39.24,
          spatialReference: {
            wkid: 4326
          }
        });
        view.when(
          (view)=>{
            view.goTo(extent);
            },
          (error)=>{
            console.log(error);
          }
        )
        //移除默认的缩放组件
        view.ui.remove("zoom");
        //创建一个room对象，实现对视图的放大和缩小
        var selfzoom = new Zoom({
          view: view
        })
        //监听功能按钮列表，获取功能事件
        document.getElementById('toolsList').onclick = function(even){
          // console.log(even);
          switch(even.target.id){
            case "biger"  :selfzoom.zoomIn();break;
            case "litter" :selfzoom.zoomOut();break;
            case "allmap" :view.goTo(extent);break;
          }
        }
        this.thisview = view;
        this.thismap = map;
      })
    },
    //底图切换组件调用本方法切换底图
    chanceBasemap(goToBasemap){
      // 引入依赖
      esriLoader.loadModules([
        "esri/widgets/BasemapToggle"
      ]).then(([BasemapToggle]) => {
        var basemapToggle = new BasemapToggle({
          view: this.thisview,
          nextBasemap: this.BasemapObjArr[goToBasemap]  
        });
        basemapToggle.toggle();
      })
    },
    //图层切换组件调用本方法切换图层
    chancelayers(chancedlayerid){
      // 引入依赖
      esriLoader.loadModules([
      ]).then(([]) => {
        let chancedlayerobj = this.thismap.findLayerById(chancedlayerid);
        chancedlayerobj.visible = !chancedlayerobj.visible;
      })
    },
    chancelistcomponent(whichListEven,whichComponentEven,e){
      this.whichListIs = whichListEven;
      if(whichListEven){
        this.listcomponent = whichComponentEven;
      }
    }
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
  /* 工具栏样式区域 */
  #toolsList{
    width: 41.66667%;
    margin-left: 29.16667%;
    position: relative;
    top: -10%;
    box-sizing: border-box;
    float: left;
    display: flex;
    align-items: center; 
  }
  .toolsListDiv{
    padding: 3px 1px;
    display: inline-block;
    flex-basis: 11.4%;
    margin: 0 auto;
    background-image: linear-gradient(#e0e0e0, #bbb);
    border: 1px solid rgba(0,0,0,.2);
    border-radius: .5em;
    box-shadow: 0 1px white inset;
    text-align: center;
    text-shadow: 0 1px 1px #85a2f761;
    color: #333333b8;
    font-weight: 200;
    font-size: 15px;
    cursor: pointer;
  }
  .toolsListDiv:active{
    background-image: linear-gradient(#a8a8a8, #bbb);
  }
    /* 地图图层控制栏样式区域 */
  #layersList{
    width: 24%;
    margin-left: 29.16667%;
    left: 40%;
    position: relative;
    top: -100%;
    box-sizing: border-box;
    float: left;
    display: flex;
    flex-wrap: wrap;
    justify-content:space-between;
    align-items: center;
  }
  .layersListDiv{
    padding: 5px 1px;
    display: inline-block;
    flex-basis: 32%;
    margin: 0 auto;
    background-image: linear-gradient(#e0e0e0, #bbb);
    border: 1px solid rgba(0,0,0,.2);
    border-radius: .5em;
    box-shadow: 0 1px white inset;
    text-align: center;
    text-shadow: 0 1px 1px #85a2f761;
    color: #333333b8;
    font-weight: 200;
    font-size: 15px;
    cursor: pointer;
  }
  .layersListPopup{
    display: inline-flex;
    flex-basis: 99%;
    margin-top: 1px;
    padding: 10px;
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.19);
    border-radius: 0.5em;
    box-shadow: 0px 1px 2px 0px #73737382;
  }
  .layersListDivIs{
    background-image: linear-gradient(#a8a8a8, #bbb);
  }
</style>