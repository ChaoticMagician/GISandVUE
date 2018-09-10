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
            <component :is="listcomponent"
            v-if="whichListIs"
            class="layersListPopup"></component>
          </keep-alive>
      </div>
  </div>
</template>

<script>
import * as esriLoader from 'esri-loader'
import baseMapList from '@/components/home/layersList/baseMapList'
import layerList from '@/components/home/layersList/layerList'
import tameList from '@/components/home/layersList/tameList'
export default {
  name: 'testmap',
  components:{
    baseMapList,layerList,tameList
  },
  data () {
    return {
      thismap: Object,
      thisview: Object,
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
          "esri/layers/support/TileInfo",
          "esri/geometry/SpatialReference",          

        "esri/views/MapView",
        "esri/geometry/Extent",
        "esri/widgets/Zoom",
        "dojo/domReady!"
      ]).then(([Map,Basemap,WebTileLayer,TileInfo,SpatialReference,
        MapView,Extent,Zoom]) => {
          console.log(window.arcgis);
        let spatialReference = new SpatialReference({ wkid: 4326 });

        let tileInfo = new TileInfo({
          dpi: 90.71428571427429,
          rows: 256,
          cols: 256,
          compressionQuality: 0,
          origin: {
            x: -180,
            y: 90
          },
          spatialReference: {
            wkid: 4326
          },
          lods: [
            {
              level: 2,
              levelValue: 2,
              resolution: 0.3515625,
              scale: 147748796.52937502
            },
            {
              level: 3,
              levelValue: 3,
              resolution: 0.17578125,
              scale: 73874398.264687508
            },
            {
              level: 4,
              levelValue: 4,
              resolution: 0.087890625,
              scale: 36937199.132343754
            },
            {
              level: 5,
              levelValue: 5,
              resolution: 0.0439453125,
              scale: 18468599.566171877
            },
            {
              level: 6,
              levelValue: 6,
              resolution: 0.02197265625,
              scale: 9234299.7830859385
            },
            {
              level: 7,
              levelValue: 7,
              resolution: 0.010986328125,
              scale: 4617149.8915429693
            },
            {
              level: 8,
              levelValue: 8,
              resolution: 0.0054931640625,
              scale: 2308574.9457714846
            },
            {
              level: 9,
              levelValue: 9,
              resolution: 0.00274658203125,
              scale: 1154287.4728857423
            },
            {
              level: 10,
              levelValue: 10,
              resolution: 0.001373291015625,
              scale: 577143.73644287116
            },
            {
              level: 11,
              levelValue: 11,
              resolution: 0.0006866455078125,
              scale: 288571.86822143558
            },
            {
              level: 12,
              levelValue: 12,
              resolution: 0.00034332275390625,
              scale: 144285.93411071779
            },
            {
              level: 13,
              levelValue: 13,
              resolution: 0.000171661376953125,
              scale: 72142.967055358895
            },
            {
              level: 14,
              levelValue: 14,
              resolution: 8.58306884765625e-5,
              scale: 36071.483527679447
            },
            {
              level: 15,
              levelValue: 15,
              resolution: 4.291534423828125e-5,
              scale: 18035.741763839724
            },
            {
              level: 16,
              levelValue: 16,
              resolution: 2.1457672119140625e-5,
              scale: 9017.8708819198619
            },
            {
              level: 17,
              levelValue: 17,
              resolution: 1.0728836059570313e-5,
              scale: 4508.9354409599309
            },
            {
              level: 18,
              levelValue: 18,
              resolution: 5.3644180297851563e-6,
              scale: 2254.4677204799655
            },
            {
              level: 19,
              levelValue: 19,
              resolution: 2.68220901489257815e-6,
              scale: 1127.23386023998275
            },
            {
              level: 20,
              levelValue: 2,
              resolution: 1.341104507446289075e-6,
              scale: 563.616930119991375
            }
          ]
        });
        //实例化电子地图
        let digitalLayer = new WebTileLayer({
          id: "digitalMap",
          title: "digitalMap",
          urlTemplate: 'http://{subDomain}.tianditu.com/DataServer?T=vec_c&x={col}&y={row}&l={level}',
          subDomains: ["t0"],
          tileInfo: tileInfo,
          spatialReference: { wkid: 4326 }
        });
        //实例化影像图
        let satelliteLayer = new WebTileLayer({
          urlTemplate: 'http://{subDomain}.tianditu.cn/img_c/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=c&TileMatrix={level}&TileRow={row}&TileCol={col}&style=default&format=tiles',
          subDomains: ["t0"],
          tileInfo: {
          dpi: 90.71428571427429,
          rows: 256,
          cols: 256,
          compressionQuality: 0,
          origin: {
            x: -180,
            y: 90
          },
          spatialReference: {
            wkid: 4326
          },
          lods: [
            {
              level: 2,
              levelValue: 2,
              resolution: 0.3515625,
              scale: 147748796.52937502
            },
            {
              level: 3,
              levelValue: 3,
              resolution: 0.17578125,
              scale: 73874398.264687508
            },
            {
              level: 4,
              levelValue: 4,
              resolution: 0.087890625,
              scale: 36937199.132343754
            },
            {
              level: 5,
              levelValue: 5,
              resolution: 0.0439453125,
              scale: 18468599.566171877
            },
            {
              level: 6,
              levelValue: 6,
              resolution: 0.02197265625,
              scale: 9234299.7830859385
            },
            {
              level: 7,
              levelValue: 7,
              resolution: 0.010986328125,
              scale: 4617149.8915429693
            },
            {
              level: 8,
              levelValue: 8,
              resolution: 0.0054931640625,
              scale: 2308574.9457714846
            },
            {
              level: 9,
              levelValue: 9,
              resolution: 0.00274658203125,
              scale: 1154287.4728857423
            },
            {
              level: 10,
              levelValue: 10,
              resolution: 0.001373291015625,
              scale: 577143.73644287116
            },
            {
              level: 11,
              levelValue: 11,
              resolution: 0.0006866455078125,
              scale: 288571.86822143558
            },
            {
              level: 12,
              levelValue: 12,
              resolution: 0.00034332275390625,
              scale: 144285.93411071779
            },
            {
              level: 13,
              levelValue: 13,
              resolution: 0.000171661376953125,
              scale: 72142.967055358895
            },
            {
              level: 14,
              levelValue: 14,
              resolution: 8.58306884765625e-5,
              scale: 36071.483527679447
            },
            {
              level: 15,
              levelValue: 15,
              resolution: 4.291534423828125e-5,
              scale: 18035.741763839724
            },
            {
              level: 16,
              levelValue: 16,
              resolution: 2.1457672119140625e-5,
              scale: 9017.8708819198619
            },
            {
              level: 17,
              levelValue: 17,
              resolution: 1.0728836059570313e-5,
              scale: 4508.9354409599309
            },
            {
              level: 18,
              levelValue: 18,
              resolution: 5.3644180297851563e-6,
              scale: 2254.4677204799655
            },
            {
              level: 19,
              levelValue: 19,
              resolution: 2.68220901489257815e-6,
              scale: 1127.23386023998275
            },
            {
              level: 20,
              levelValue: 2,
              resolution: 1.341104507446289075e-6,
              scale: 563.616930119991375
            }
          ]
        },
          spatialReference: { wkid: 4326 }
        });
        //实例化地图标注
        let anooMarkerLayer = new WebTileLayer({
          id: "anooMarkerMap",
          title: "anooMarkerMap",
          urlTemplate: 'http://{subDomain}.tianditu.com/DataServer?T=cva_c&x={col}&y={row}&l={level}',
          subDomains: ["t0"],
          tileInfo: tileInfo,
          spatialReference: { wkid: 4326 },
        });
        //实例化Map对象
        let mapControl = new Map({
          //spatialReference:spatialReference,
          basemap: {
            baseLayers: [satelliteLayer, anooMarkerLayer]
          }
        });




        //依据传进来的map获取创建视图
        var view = new MapView({
          map: mapControl,
          container: "viewDiv",
          zoom:6,
        });
        //设置显示的最大层级
        view.constraints = {
          minZoom: 6, 
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
      })
    },
    //调用底图切换组件
    chanceBasemap(){
      var testv = "streets";
      // 引入依赖
      esriLoader.loadModules([
        "esri/widgets/BasemapToggle"
      ]).then(([BasemapToggle]) => {
        var basemapToggle = new BasemapToggle({
          view: this.thisview,
          nextBasemap: testv  
        });
        basemapToggle.toggle();
      })
    },
    chancelistcomponent(whichListEven,whichComponentEven,e){
      console.log([whichListEven,whichComponentEven,e]);
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
    width: 23.66667%;
    margin-left: 29.16667%;
    left: 42%;
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
