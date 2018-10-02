/*
arcgis初始化配置
*/
//添加gerjson的数据依赖
import {print} from "@/map/print.js"
import {line} from "@/map/line.js"
import {surface} from "@/map/surface.js"


export function arcgisConfig () {
  window.arcgis = {
    config: {
      proxyUrl: 'http://123.56.17.204:8091/4.8/init.js',
      baseUrl:  'http://123.56.17.204:8091/4.8/init.js',
      dojoUrl:  'http://123.56.17.204:8091/4.8/library/4.7/dojo',
      selfJsUrl:  'http://123.56.17.204:8091/selftooljs/',
      wkid: 4326,
      getBaseUrl: function () {
        return this.baseUrl
      },
      getDojoUrl: function () {
        return this.dojoUrl
      },
      getWkid: function () {
        return this.offlineMapWkid
      }
    },
    /***
     * type属性为加载baseLayers的创建类型，目前可行的类型为天地图的wmts，后期能力添加
     * type类型为 1（number）时，为天地图的wmts
    ***/
    baseLayers:{
      diazilayer:{
        type: 1,
        name: '天地图的电子地图',
        config:{
          id:'diazilayer',
          urlTemplate: 'http://{subDomain}.tianditu.com/DataServer?T=vec_c&x={col}&y={row}&l={level}',
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
        }
      },
      yaoganlayer:{
        type: 1,
        name: '天地图的遥感影像',
        config:{
          id:'yaoganlayer',
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
        }
      },
      biaozhulayer:{
        type: 1,
        name: '天地图的地图标注',
        config:{
          id:'biaozhulayer',
          urlTemplate: 'http://{subDomain}.tianditu.com/DataServer?T=cva_c&x={col}&y={row}&l={level}',
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
        }
      }
    },
    /***
     *baseMapList的配置列表
     *重在表示每个按钮所显示的baselayer
     *key不可重复，有且有一个key为“default”，，为地图的默认底图,
     *type为map的类型，主要为‘dianzi’、和‘yaogan’，是控制basemap缩略图的要素。
     ps：vue动态添加图片路径太烦了，给图片懒加载，回头再说
    ***/
    baseMapList:[
      {
        key:'difault',
        type:'dianzi',
        id:"dianziditu",
        title:"电子地图",
        thumbnailUrl:"@/assets/mapimg/instmap.PNG",
        baseLayers:['diazilayer','biaozhulayer']
      },
      {
        key:'other1',
        type:'yaogan',
        id:"yaoganyingxiang",
        title:"遥感影像",
        thumbnailUrl:"@/assets/mapimg/sanwei1.PNG",
        baseLayers:['yaoganlayer','biaozhulayer']
      },
    ],
    /***
     * layersList中type的能值map-image | wms-layer
     * 是图层的类型,暂时只支持imagery和WMS类型，
     * 20181003添加geojson的图层加载方式，类型分别为geojsondata和geojsonurl
     * 
     * 
    
    ***/
    layersList:[
      // {
      //   id:'xiaowangzhuang',
      //   title:'小王王庄数据',
      //   url: "http://localhost:6080/arcgis/rest/services/localhostdata/XWZdemo/MapServer",
      //   type:'map-image',
      //   opacity: 1,
      //   visible: false
      // },
      {
        id:'fgm',
        title:'楼宇覆盖面',
        url: "http://123.56.17.204:8081/geoserver/selfmap/wms",
        sublayers:{
          name: "FGM"
        },
        type:'wms',
        Version:'1.1.0',
        opacity: 1,
        visible: false
      },
      {
        id:'mz',
        title:'小王庄门址',
        url: "http://123.56.17.204:8081/geoserver/selfmap/wms",
        sublayers:{
          name: "MZ"
        },
        type:'wms',
        Version:'1.1.0',
        opacity: 1,
        visible: false
      },
      {
        id:'dl',
        title:'小王庄道路',
        url: "http://123.56.17.204:8081/geoserver/selfmap/wms",
        sublayers:{
          name: "DL"
        },
        type:'wms',
        Version:'1.1.0',
        opacity: 1,
        visible: false
      },
      {
        id:'geojsonprint',
        title:'门址GeoJsonD版',
        // url: "http://123.56.17.204:8081/geoserver/selfmap/wms",
        data: print,
        type:'geojsondata',
        Version:'1.0.0',
        opacity: 1,
        visible: false
      },
      {
        id:'geojsonline',
        title:'道路GeoJsonD版',
        // url: "http://123.56.17.204:8081/geoserver/selfmap/wms",
        data: line,
        type:'geojsondata',
        Version:'1.0.0',
        opacity: 1,
        visible: false
      },
      {
        id:'geojsonsurface',
        title:'覆盖面GeoJsonD版',
        // url: "http://123.56.17.204:8081/geoserver/selfmap/wms",
        data: surface,
        type:'geojsondata',
        Version:'1.0.0',
        opacity: 1,
        visible: false
      },
    ],
    /**
     * 这里是热力图的渲染配置
     * 用于渲染热力图
     */
    renderer : {
      type: "heatmap",
      colorStops: [
      {
        color: "rgba(63, 40, 102, 0)",
        ratio: 0
      },
      {
        color: "#472b77",
        ratio: 0.083
      },
      {
        color: "#4e2d87",
        ratio: 0.166
      },
      {
        color: "#563098",
        ratio: 0.249
      },
      {
        color: "#5d32a8",
        ratio: 0.332
      },
      {
        color: "#6735be",
        ratio: 0.415
      },
      {
        color: "#7139d4",
        ratio: 0.498
      },
      {
        color: "#7b3ce9",
        ratio: 0.581
      },
      {
        color: "#853fff",
        ratio: 0.664
      },
      {
        color: "#a46fbf",
        ratio: 0.747
      },
      {
        color: "#c29f80",
        ratio: 0.830
      },
      {
        color: "#e0cf40",
        ratio: 0.913
      },
      {
        color: "#ffff00",
        ratio: 1
      }],
      maxPixelIntensity: 25,
      minPixelIntensity: 0
    },
    /**
     * 这是图层的渲染样式
     */
    quakesRenderer : {
      type: "simple", 
      symbol: {
              type: "simple-marker",  
              size: 6,
              color: "black",
              outline: {  
              width: 0.5,
              color: "white"
              }
      },
    }
  };
}
