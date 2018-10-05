<template>
  <div class="eleMap" style="height: 100%;">
    <div id="viewDiv"></div>
  </div>
</template>

<script>
import * as esriLoader from 'esri-loader'
export default {
  name: 'hotmap',
  data () {
    return {
    }
  },
  mounted () {
    this.createMap()
  },
  methods: {
    createMap () {
      //这是esri-loader选项配置，本处是配置dojoconfig
      // const options = {
      //   dojoConfig:{
      //     has:{
      //       "esri-featurelayer-webgl": 1
      //     }
      //   }
      // };
      // 引入依赖
      esriLoader.loadModules([
        "esri/Map",
        "esri/layers/CSVLayer",
        "esri/views/MapView",
        "esri/config",
        "esri/widgets/Legend",
        "esri/layers/FeatureLayer",
        "dojo/domReady!",
      ]).then(([Map, CSVLayer,MapView,esriConfig,Legend,FeatureLayer]) => {
        const url ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.csv";
        esriConfig.request.corsEnabledServers.push(url);
      var fields = [
        {
          name: "ObjectID",
          alias: "ObjectID",
          type: "oid"
        },
        {
          name: "Name",
          alias: "Name",
          type: "string"
        }, {
          name: "AddName",
          alias: "AddName",
          type: "string"
        }, {
          name: "BuiName",
          alias: "BuiName",
          type: "string"
        }, {
          name: "CelName",
          alias: "CelName",
          type: "string"
        }, {
          name: "Class",
          alias: "Class",
          type: "string"
        }, {
          name: "BZ",
          alias: "BZ",
          type: "string"
        }, {
          name: "WKT",
          alias: "WKT",
          type: "string"
        }];

        var quakesRenderer = {
          type: "simple", // autocasts as new SimpleRenderer()
          symbol: {
                  type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                  size: 6,
                  color: "black",
                  outline: {  // autocasts as new SimpleLineSymbol()
                  width: 0.5,
                  color: "white"
                  }
          },
        };

        const renderer = {
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
        };

        let featuretest =  new FeatureLayer({
          url:'http://localhost:6080/arcgis/rest/services/XWZ/MapServer/0',
          renderer: renderer,
        });



        let layer = new CSVLayer({
          url: url,        
            title: "Magnitude 2.5+ earthquakes from the last week",
            copyright: "USGS Earthquakes",
          renderer: renderer
        });

        let map = new Map({
          basemap: "gray",
          layers: [layer,featuretest]
        });

        let view = new MapView({
          container: "viewDiv",
          center: [-138, 30],
          zoom: 3,
          map: map
        });
        
        // view.when(function() {
        //   // Request the earthquake data from USGS when the view resolves
        //   var data = getData();
        //   console.log(data);
        //   var getgraphics = createGraphics(data);
        //   console.log(getgraphics);
        //   var getlayer = createLayer(getgraphics);
        //   console.log(getlayer);

        // });

        // // Request the earthquake data
        // function getData() {
        //   var geojsondata = {"type":"FeatureCollection","totalFeatures":373,"features":[{"type":"Feature","id":"MZ.1","geometry":{"type":"Point","coordinates":[117.15785472,38.75301382]},"geometry_name":"the_geom","properties":{"OBJECTID":1,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园1号楼3单元","BuiName":"1号楼","CelName":"3单元","Class":"门址","BZ":"","WKT":"POINT (117.15785471900006 38.753013816000077)"}},{"type":"Feature","id":"MZ.2","geometry":{"type":"Point","coordinates":[117.15806895,38.75304744]},"geometry_name":"the_geom","properties":{"OBJECTID":2,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园1号楼2单元","BuiName":"1号楼","CelName":"2单元","Class":"门址","BZ":"","WKT":"POINT (117.1580689540001 38.753047442000081)"}},{"type":"Feature","id":"MZ.3","geometry":{"type":"Point","coordinates":[117.15831891,38.75305312]},"geometry_name":"the_geom","properties":{"OBJECTID":3,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园1号楼1单元","BuiName":"1号楼","CelName":"1单元","Class":"门址","BZ":"","WKT":"POINT (117.15831891400001 38.753053117000036)"}},{"type":"Feature","id":"MZ.4","geometry":{"type":"Point","coordinates":[117.15783314,38.75328784]},"geometry_name":"the_geom","properties":{"OBJECTID":4,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园2号楼3单元","BuiName":"2号楼","CelName":"3单元","Class":"门址","BZ":"","WKT":"POINT (117.15783314400005 38.753287835000037)"}},{"type":"Feature","id":"MZ.5","geometry":{"type":"Point","coordinates":[117.15801881,38.75332704]},"geometry_name":"the_geom","properties":{"OBJECTID":5,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园2号楼2单元","BuiName":"2号楼","CelName":"2单元","Class":"门址","BZ":"","WKT":"POINT (117.15801881000004 38.75332704300007)"}},{"type":"Feature","id":"MZ.6","geometry":{"type":"Point","coordinates":[117.15820449,38.75334947]},"geometry_name":"the_geom","properties":{"OBJECTID":6,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园2号楼1单元","BuiName":"2号楼","CelName":"1单元","Class":"门址","BZ":"","WKT":"POINT (117.15820448500006 38.753349474000061)"}},{"type":"Feature","id":"MZ.7","geometry":{"type":"Point","coordinates":[117.15797579,38.75364579]},"geometry_name":"the_geom","properties":{"OBJECTID":7,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园3号楼3单元","BuiName":"3号楼","CelName":"3单元","Class":"门址","BZ":"","WKT":"POINT (117.15797578600007 38.753645793000089)"}},{"type":"Feature","id":"MZ.8","geometry":{"type":"Point","coordinates":[117.15819003,38.75366264]},"geometry_name":"the_geom","properties":{"OBJECTID":8,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园3号楼2单元","BuiName":"3号楼","CelName":"2单元","Class":"门址","BZ":"","WKT":"POINT (117.1581900330001 38.753662642000052)"}},{"type":"Feature","id":"MZ.9","geometry":{"type":"Point","coordinates":[117.15858994,38.75372988]},"geometry_name":"the_geom","properties":{"OBJECTID":9,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园4号楼3单元","BuiName":"4号楼","CelName":"3单元","Class":"门址","BZ":"","WKT":"POINT (117.15858994100006 38.753729881000083)"}},{"type":"Feature","id":"MZ.10","geometry":{"type":"Point","coordinates":[117.15876848,38.75374672]},"geometry_name":"the_geom","properties":{"OBJECTID":10,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园4号楼2单元","BuiName":"4号楼","CelName":"2单元","Class":"门址","BZ":"","WKT":"POINT (117.15876847800007 38.75374671700007)"}},{"type":"Feature","id":"MZ.11","geometry":{"type":"Point","coordinates":[117.15896844,38.75377474]},"geometry_name":"the_geom","properties":{"OBJECTID":11,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园4号楼1单元","BuiName":"4号楼","CelName":"1单元","Class":"门址","BZ":"","WKT":"POINT (117.15896843500002 38.753774744000054)"}},{"type":"Feature","id":"MZ.12","geometry":{"type":"Point","coordinates":[117.15865441,38.75337758]},"geometry_name":"the_geom","properties":{"OBJECTID":12,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园5号楼3单元","BuiName":"5号楼","CelName":"3单元","Class":"门址","BZ":"","WKT":"POINT (117.15865440500011 38.753377584000077)"}},{"type":"Feature","id":"MZ.13","geometry":{"type":"Point","coordinates":[117.15881866,38.75338882]},"geometry_name":"the_geom","properties":{"OBJECTID":13,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园5号楼2单元","BuiName":"5号楼","CelName":"2单元","Class":"门址","BZ":"","WKT":"POINT (117.15881866100005 38.753388822000034)"}},{"type":"Feature","id":"MZ.14","geometry":{"type":"Point","coordinates":[117.15896148,38.75342802]},"geometry_name":"the_geom","properties":{"OBJECTID":14,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园5号楼1单元","BuiName":"5号楼","CelName":"1单元","Class":"门址","BZ":"","WKT":"POINT (117.15896147700005 38.753428015000054)"}},{"type":"Feature","id":"MZ.15","geometry":{"type":"Point","coordinates":[117.15872601,38.7530197]},"geometry_name":"the_geom","properties":{"OBJECTID":15,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园6号楼3单元","BuiName":"6号楼","CelName":"3单元","Class":"门址","BZ":"","WKT":"POINT (117.15872601400008 38.753019696000081)"}},{"type":"Feature","id":"MZ.16","geometry":{"type":"Point","coordinates":[117.15890455,38.75303653]},"geometry_name":"the_geom","properties":{"OBJECTID":16,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园6号楼2单元","BuiName":"6号楼","CelName":"2单元","Class":"门址","BZ":"","WKT":"POINT (117.158904549 38.753036531000078)"}},{"type":"Feature","id":"MZ.17","geometry":{"type":"Point","coordinates":[117.15912592,38.75308134]},"geometry_name":"the_geom","properties":{"OBJECTID":17,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园6号楼1单元","BuiName":"6号楼","CelName":"1单元","Class":"门址","BZ":"","WKT":"POINT (117.15912592100005 38.753081342000087)"}},{"type":"Feature","id":"MZ.18","geometry":{"type":"Point","coordinates":[117.1596187,38.75308709]},"geometry_name":"the_geom","properties":{"OBJECTID":18,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园7号楼3单元","BuiName":"7号楼","CelName":"3单元","Class":"门址","BZ":"","WKT":"POINT (117.1596187020001 38.753087092000044)"}},{"type":"Feature","id":"MZ.19","geometry":{"type":"Point","coordinates":[117.1597901,38.75310392]},"geometry_name":"the_geom","properties":{"OBJECTID":19,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园7号楼2单元","BuiName":"7号楼","CelName":"2单元","Class":"门址","BZ":"","WKT":"POINT (117.15979009600005 38.753103924000072)"}},{"type":"Feature","id":"MZ.20","geometry":{"type":"Point","coordinates":[117.15995435,38.75312635]},"geometry_name":"the_geom","properties":{"OBJECTID":20,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园7号楼1单元","BuiName":"7号楼","CelName":"1单元","Class":"门址","BZ":"","WKT":"POINT (117.15995434600006 38.753126345000055)"}},{"type":"Feature","id":"MZ.21","geometry":{"type":"Point","coordinates":[117.15961138,38.75343382]},"geometry_name":"the_geom","properties":{"OBJECTID":21,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园8号楼3单元","BuiName":"8号楼","CelName":"3单元","Class":"门址","BZ":"","WKT":"POINT (117.15961138 38.75343381600004)"}},{"type":"Feature","id":"MZ.22","geometry":{"type":"Point","coordinates":[117.15976135,38.75344505]},"geometry_name":"the_geom","properties":{"OBJECTID":22,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园8号楼2单元","BuiName":"8号楼","CelName":"2单元","Class":"门址","BZ":"","WKT":"POINT (117.15976135300002 38.75344504800006)"}},{"type":"Feature","id":"MZ.23","geometry":{"type":"Point","coordinates":[117.15992561,38.75346188]},"geometry_name":"the_geom","properties":{"OBJECTID":23,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园8号楼1单元","BuiName":"8号楼","CelName":"1单元","Class":"门址","BZ":"","WKT":"POINT (117.159925606 38.753461878000053)"}},{"type":"Feature","id":"MZ.24","geometry":{"type":"Point","coordinates":[117.15963974,38.75384207]},"geometry_name":"the_geom","properties":{"OBJECTID":24,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园9号楼2单元","BuiName":"9号楼","CelName":"2单元","Class":"门址","BZ":"","WKT":"POINT (117.15963973500004 38.753842067000051)"}},{"type":"Feature","id":"MZ.25","geometry":{"type":"Point","coordinates":[117.15981113,38.75387008]},"geometry_name":"the_geom","properties":{"OBJECTID":25,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园9号楼1单元","BuiName":"9号楼","CelName":"1单元","Class":"门址","BZ":"","WKT":"POINT (117.15981112600002 38.753870084000084)"}},{"type":"Feature","id":"MZ.26","geometry":{"type":"Point","coordinates":[117.16013929,38.75456923]},"geometry_name":"the_geom","properties":{"OBJECTID":26,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园10号楼3单元","BuiName":"10号楼","CelName":"3单元","Class":"门址","BZ":"","WKT":"POINT (117.16013929400003 38.754569232000051)"}},{"type":"Feature","id":"MZ.27","geometry":{"type":"Point","coordinates":[117.16031784,38.75456929]},"geometry_name":"the_geom","properties":{"OBJECTID":27,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园10号楼2单元","BuiName":"10号楼","CelName":"2单元","Class":"门址","BZ":"","WKT":"POINT (117.16031784200004 38.754569288000084)"}},{"type":"Feature","id":"MZ.28","geometry":{"type":"Point","coordinates":[117.16049637,38.7546029]},"geometry_name":"the_geom","properties":{"OBJECTID":28,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园10号楼1单元","BuiName":"10号楼","CelName":"1单元","Class":"门址","BZ":"","WKT":"POINT (117.1604963740001 38.754602898000087)"}},{"type":"Feature","id":"MZ.29","geometry":{"type":"Point","coordinates":[117.16011803,38.75425605]},"geometry_name":"the_geom","properties":{"OBJECTID":29,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园11号楼3单元","BuiName":"11号楼","CelName":"3单元","Class":"门址","BZ":"","WKT":"POINT (117.16011802900005 38.754256053000063)"}},{"type":"Feature","id":"MZ.30","geometry":{"type":"Point","coordinates":[117.16032513,38.75428408]},"geometry_name":"the_geom","properties":{"OBJECTID":30,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园11号楼2单元","BuiName":"11号楼","CelName":"2单元","Class":"门址","BZ":"","WKT":"POINT (117.16032513000005 38.754284080000048)"}},{"type":"Feature","id":"MZ.31","geometry":{"type":"Point","coordinates":[117.16054652,38.75430093]},"geometry_name":"the_geom","properties":{"OBJECTID":31,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园11号楼1单元","BuiName":"11号楼","CelName":"1单元","Class":"门址","BZ":"","WKT":"POINT (117.16054652000003 38.754300926000042)"}},{"type":"Feature","id":"MZ.32","geometry":{"type":"Point","coordinates":[117.16026104,38.75390937]},"geometry_name":"the_geom","properties":{"OBJECTID":32,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园12号楼3单元","BuiName":"12号楼","CelName":"3单元","Class":"门址","BZ":"","WKT":"POINT (117.16026104400009 38.753909372000066)"}},{"type":"Feature","id":"MZ.33","geometry":{"type":"Point","coordinates":[117.16040386,38.75394297]},"geometry_name":"the_geom","properties":{"OBJECTID":33,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园12号楼2单元","BuiName":"12号楼","CelName":"2单元","Class":"门址","BZ":"","WKT":"POINT (117.16040386400005 38.753942971000072)"}},{"type":"Feature","id":"MZ.34","geometry":{"type":"Point","coordinates":[117.16056098,38.7539542]},"geometry_name":"the_geom","properties":{"OBJECTID":34,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园12号楼1单元","BuiName":"12号楼","CelName":"1单元","Class":"门址","BZ":"","WKT":"POINT (117.16056098000001 38.753954204000081)"}},{"type":"Feature","id":"MZ.35","geometry":{"type":"Point","coordinates":[117.16031121,38.75356266]},"geometry_name":"the_geom","properties":{"OBJECTID":35,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园13号楼3单元","BuiName":"13号楼","CelName":"3单元","Class":"门址","BZ":"","WKT":"POINT (117.1603112140001 38.753562661000046)"}},{"type":"Feature","id":"MZ.36","geometry":{"type":"Point","coordinates":[117.1604969,38.7535739]},"geometry_name":"the_geom","properties":{"OBJECTID":36,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园13号楼2单元","BuiName":"13号楼","CelName":"2单元","Class":"门址","BZ":"","WKT":"POINT (117.16049689600004 38.753573904000064)"}},{"type":"Feature","id":"MZ.37","geometry":{"type":"Point","coordinates":[117.16063258,38.75359632]},"geometry_name":"the_geom","properties":{"OBJECTID":37,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园13号楼1单元","BuiName":"13号楼","CelName":"1单元","Class":"门址","BZ":"","WKT":"POINT (117.16063257900009 38.753596315000038)"}},{"type":"Feature","id":"MZ.38","geometry":{"type":"Point","coordinates":[117.1603114,38.75319916]},"geometry_name":"the_geom","properties":{"OBJECTID":38,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园14号楼3单元","BuiName":"14号楼","CelName":"3单元","Class":"门址","BZ":"","WKT":"POINT (117.16031139900008 38.753199158000086)"}},{"type":"Feature","id":"MZ.39","geometry":{"type":"Point","coordinates":[117.16051135,38.75323837]},"geometry_name":"the_geom","properties":{"OBJECTID":39,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园14号楼2单元","BuiName":"14号楼","CelName":"2单元","Class":"门址","BZ":"","WKT":"POINT (117.16051135000009 38.753238367000051)"}},{"type":"Feature","id":"MZ.40","geometry":{"type":"Point","coordinates":[117.16070417,38.7532552]},"geometry_name":"the_geom","properties":{"OBJECTID":40,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园14号楼1单元","BuiName":"14号楼","CelName":"1单元","Class":"门址","BZ":"","WKT":"POINT (117.16070417000003 38.753255203000037)"}},{"type":"Feature","id":"MZ.41","geometry":{"type":"Point","coordinates":[117.16041155,38.75286924]},"geometry_name":"the_geom","properties":{"OBJECTID":41,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园15号楼3单元","BuiName":"15号楼","CelName":"3单元","Class":"门址","BZ":"","WKT":"POINT (117.16041155200003 38.752869240000052)"}},{"type":"Feature","id":"MZ.42","geometry":{"type":"Point","coordinates":[117.16056151,38.75291403]},"geometry_name":"the_geom","properties":{"OBJECTID":42,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园15号楼2单元","BuiName":"15号楼","CelName":"2单元","Class":"门址","BZ":"","WKT":"POINT (117.16056150600002 38.752914025000052)"}},{"type":"Feature","id":"MZ.43","geometry":{"type":"Point","coordinates":[117.16076147,38.75291968]},"geometry_name":"the_geom","properties":{"OBJECTID":43,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园15号楼1单元","BuiName":"15号楼","CelName":"1单元","Class":"门址","BZ":"","WKT":"POINT (117.16076147300009 38.752919679000058)"}},{"type":"Feature","id":"MZ.44","geometry":{"type":"Point","coordinates":[117.16045456,38.75256167]},"geometry_name":"the_geom","properties":{"OBJECTID":44,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园16号楼3单元","BuiName":"16号楼","CelName":"3单元","Class":"门址","BZ":"","WKT":"POINT (117.16045455900007 38.752561673000059)"}},{"type":"Feature","id":"MZ.45","geometry":{"type":"Point","coordinates":[117.1606688,38.7525897]},"geometry_name":"the_geom","properties":{"OBJECTID":45,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园16号楼2单元","BuiName":"16号楼","CelName":"2单元","Class":"门址","BZ":"","WKT":"POINT (117.16066879700008 38.752589701000034)"}},{"type":"Feature","id":"MZ.46","geometry":{"type":"Point","coordinates":[117.16081877,38.75259534]},"geometry_name":"the_geom","properties":{"OBJECTID":46,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园16号楼1单元","BuiName":"16号楼","CelName":"1单元","Class":"门址","BZ":"","WKT":"POINT (117.16081877000011 38.752595340000084)"}},{"type":"Feature","id":"MZ.47","geometry":{"type":"Point","coordinates":[117.1598047,38.75249436]},"geometry_name":"the_geom","properties":{"OBJECTID":47,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园17号楼3单元","BuiName":"17号楼","CelName":"3单元","Class":"门址","BZ":"","WKT":"POINT (117.15980469500005 38.752494361000061)"}},{"type":"Feature","id":"MZ.48","geometry":{"type":"Point","coordinates":[117.15999038,38.75249442]},"geometry_name":"the_geom","properties":{"OBJECTID":48,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园17号楼2单元","BuiName":"17号楼","CelName":"2单元","Class":"门址","BZ":"","WKT":"POINT (117.15999038000007 38.752494419000072)"}},{"type":"Feature","id":"MZ.49","geometry":{"type":"Point","coordinates":[117.16016891,38.75252803]},"geometry_name":"the_geom","properties":{"OBJECTID":49,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园17号楼1单元","BuiName":"17号楼","CelName":"1单元","Class":"门址","BZ":"","WKT":"POINT (117.16016890600008 38.752528030000065)"}},{"type":"Feature","id":"MZ.50","geometry":{"type":"Point","coordinates":[117.15973314,38.75275718]},"geometry_name":"the_geom","properties":{"OBJECTID":50,"Name":"泽安园","AddName":"天津市滨海新区小王庄镇泽安园18号楼3单元","BuiName":"18号楼","CelName":"3单元","Class":"门址","BZ":"","WKT":"POINT (117.15973314100006 38.752757179000071)"}}],"crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:EPSG::4326"}}}
        //   return geojsondata;
        // }

        // /**************************************************
        //  * Create graphics with returned geojson data
        //  **************************************************/

        // function createGraphics(response) {
        //   // raw GeoJSON data
        //   var geoJson = response;

        //   // Create an array of Graphics from each GeoJSON feature
        //   return geoJson.features.map(function(feature, i) {
        //     return {
        //       geometry: new Point({
        //         x: feature.geometry.coordinates[0],
        //         y: feature.geometry.coordinates[1]
        //       }),
        //       // select only the attributes you care about
        //       attributes: {
        //         ObjectID: i,
        //         Name: feature.properties.Name,
        //         AddName: feature.properties.AddName,
        //         BuiName: feature.properties.BuiName,
        //         CelName: feature.properties.CelName,
        //         Class: feature.properties.Class,
        //         BZ: feature.properties.BZ,
        //         WKT: feature.properties.WKT
        //       }
        //     };
        //   });
        // }

        // /**************************************************
        //  * Create a FeatureLayer with the array of graphics
        //  **************************************************/

        // function createLayer(graphics) {

        //   let layer = new FeatureLayer({
        //     source: graphics, // autocast as an array of esri/Graphic
        //     // create an instance of esri/layers/support/Field for each field object
        //     fields: fields, // This is required when creating a layer from Graphics
        //     objectIdField: "ObjectID", // This must be defined when creating a layer from Graphics
        //     renderer: quakesRenderer, // set the visualization on the layer
        //   });

        //   map.add(layer);
        //   return layer;
        // }


      })
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
</style>
