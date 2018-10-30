<template>
  <div class="eleMap" style="height: 100%;">
    <div id="viewDiv"></div>
      <!-- 这是地图功能 -->
      <div id='toolsList'  >
        <div class="toolsListDiv" id="biger"><i id="biger" class="toolsLIstIcon iconfont icon-fangda">放大</i></div>
        <div class="toolsListDiv" id="litter"><i id="litter" class="toolsLIstIcon iconfont icon-suoxiao1"></i>缩小</div>
        <div class="toolsListDiv" id="drawquery"><i id="allmap" class="toolsLIstIcon iconfont icon-fangda1"></i>框选</div>
        <div class="toolsListDiv" id="query"><i id="query" class="toolsLIstIcon iconfont icon-ditu1"></i>查询</div>
        <div class="toolsListDiv" id="long"><i id="long" class="toolsLIstIcon iconfont icon-dituchizi"></i>长度</div>
        <div class="toolsListDiv" id="area"><i id="area" class="toolsLIstIcon iconfont icon-ditu1"></i>面积</div>
        <div class="toolsListDiv" id="legend"><i id="legend" class="toolsLIstIcon iconfont icon-ditudaohang-"></i>图例</div>
        <div class="toolsListDiv" id="remove"><i id="remove" class="toolsLIstIcon iconfont icon-ditu"></i>清除</div>
      </div>
      <!-- 这是地图图层控制 -->
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
      <!-- 这是图层要素图层查询 -->
      <layer-query 
        ref="layerQuery"
        v-if="ifquire"
        :thisview=thisview
        :ifquire=ifquire
        @chance-layers-even='chancelayers'
        @chance-if-quire='ifquire=false'
      ></layer-query>
      <!-- 这是绘图要素图层查询 -->
      <draw-query 
        ref="drawQuery"
        v-if="ifDrawquire"
        :thisview=thisview
        :ifDrawquire=ifDrawquire
        @chance-layers-even='chancelayers'
        @chance-if-quire='ifDrawquire=false'
      ></draw-query>
  </div>
</template>

<script>
import * as esriLoader from 'esri-loader'
import baseMapList from '@/components/home/layersList/baseMapList'
import layerList   from '@/components/home/layersList/layerList'
import tameList    from '@/components/home/layersList/tameList'
import layerQuery    from '@/components/home/query/layerQuery'
import drawQuery    from '@/components/home/query/drawQuery'
export default {
  name: 'tilemap',
  components:{
    baseMapList,layerList,tameList,layerQuery,drawQuery
  },
  data () {
    return {
      BasemapObjArr: Object,
      thisview: Object,
      thismap: Object,
      layerListEvent:{},
      listcomponent:'baseMapList',
      whichListIs: null,
      ifquire:false,
      ifDrawquire:true,
    }
  },
  computed:{
  },
  mounted(){
    this.createView(this)
  },
  methods: {
    createView (vuem) {
      // 引入依赖
      esriLoader.loadModules([
        "esri/Map",
        "esri/Basemap",
        "esri/layers/WebTileLayer",
        "esri/layers/MapImageLayer",
        "esri/layers/WMSLayer",
        'esri/request',
        "esri/config",
        
        //个人工具组件封装的jd
        "/static/Toolsjs/measureTools.js",
        "/static/Toolsjs/geojsonDataToFeatureLayer.js",
        
        "esri/views/2d/draw/Draw",
        "esri/views/MapView",
        "esri/geometry/Extent",
        "esri/widgets/Zoom",
        "dojo/domReady!"
      ]).then(([Map,Basemap,WebTileLayer,MapImageLayer,WMSLayer,esriRequest,esriConfig,
        measureTools,geojsonDataToFeatureLayer,
        Draw,MapView,Extent,Zoom]) => {

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
        esriConfig.request.corsEnabledServers.push("https://t0.tianditu.com");
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
        esriConfig.request.corsEnabledServers.push("http://123.56.17.204:8081");
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
          }else if(tram.type == "wms"){
            //创建本地WMS图层，，
            var WMSLayerlayer1 = new WMSLayer({
              id: tram.id,
              title: tram.title,
              url: tram.url,
              featureInfoUrl: tram.featureInfoUrl,
              featureInfoField:tram.featureInfoField,
              sublayers: [{
                name: tram.sublayers.name
              }],
              Version: tram.Version,
              opacity: tram.opacityd,
              visible: tram.visible
            });
            layersArr.push(WMSLayerlayer1);
          }else if(tram.type == "geojsonURL"){
            /**用goeserver的geojson服务创建featureLayer图层，并用热力图渲染器渲染*/
            //外层用异步方法获取geojson服务的数据
            esriRequest(tram.url, { responseType: "json" })
            .then((response) => {
              //用个人封装的方法将geojson数据转换为graphics的集合
              var Graphics = geojsonDataToFeatureLayer.geojsonDataToGraphics(response.data);
              //用个人封装的方法将graphics的集合转换为featureLayer图层，并添加渲染器
              //PS：如果为点线面图层，具有默认的渲染器；方法传参如下：
              // function GraphicsToFeatureLayer(Graphics,id,title,opacity,visible,renderjson){}
              var learyreturn = geojsonDataToFeatureLayer.GraphicsToFeatureLayer(
                Graphics,
                tram.id,
                tram.title,
                tram.opacity,
                tram.visible,
                tram.renderer,
              );
              map.add(learyreturn);
            })
            .catch((err) => {
                console.error(err);
            });
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
          minZoom: 6, 
          rotationEnabled: false  
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
          var draw = new Draw({view: view});
          // console.log(even);
          switch(even.target.id){
            case "biger"  :selfzoom.zoomIn();break;
            case "litter" :selfzoom.zoomOut();break;
            case "drawquery" :{ if(vuem.ifDrawquire){
                                  vuem.$refs.drawQuery.chanceIfQuire();
                                }
                                else{
                                  vuem.ifquire=false;
                                  vuem.ifDrawquire=true;
                                }
                              };break;
            case "query":{ if(vuem.ifquire){
                            vuem.$refs.layerQuery.chanceIfQuire();
                          }else{
                                  vuem.ifDrawquire=false;
                                  vuem.ifquire=true;
                                }
                         };break;
            case "long" : view.graphics.removeAll();
                            measureTools.drawPolylineMeasuelong(draw,view,'long');
                          break;
            case "area" : view.graphics.removeAll();
                            measureTools.drawPolygonMeasueArea(draw,view,'area');
                          break;
            case "remove" :view.graphics.removeAll();break;
          }
        };
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
    chancelayers(chancedlayerid,visible){
      // 引入依赖
      esriLoader.loadModules([
        'esri/request',
        "/static/Toolsjs/geojsonDataToFeatureLayer.js",
      ]).then(([esriRequest,geojsonDataToFeatureLayer]) => {
        let chancedlayerobj = this.thismap.findLayerById(chancedlayerid);
        chancedlayerobj.visible = visible;
        //添加弹窗用的featurelayer图层；
        if(chancedlayerobj.visible&&chancedlayerobj.type!="feature"){
          esriRequest(chancedlayerobj.featureInfoUrl, { responseType: "json" })
          .then((response) => {
            let proplayer = geojsonDataToFeatureLayer.geojsonDataToFeature(response.data,chancedlayerobj.id+"fea",chancedlayerobj.featureInfoField);
            this.thismap.add(proplayer);
          })
        }else{
          let proplayer = this.thismap.findLayerById(chancedlayerobj.id+"fea");
          this.thismap.remove(proplayer);
        }
      })
    },
    //这是组件切换组件
    chancelistcomponent(whichListEven,whichComponentEven,e){
      this.whichListIs = whichListEven;
      if(whichListEven){
        this.listcomponent = whichComponentEven;
      }
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

  /* 属性查询面板区域样式区域 */
  .quirePanel{
    position: relative;
    top: -90%;
    left: -1.6%;
  }
</style>