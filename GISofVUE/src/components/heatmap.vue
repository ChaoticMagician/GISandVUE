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
        "dojo/domReady!"
      ]).then(([Map, CSVLayer,MapView,esriConfig,Legend]) => {
        const url ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.csv";
        esriConfig.request.corsEnabledServers.push(url);

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

        const layer = new CSVLayer({
          url: url,        
            title: "Magnitude 2.5+ earthquakes from the last week",
            copyright: "USGS Earthquakes",
          renderer: renderer
        });

        const map = new Map({
          basemap: "gray",
          layers: [layer]
        });

        const view = new MapView({
          container: "viewDiv",
          center: [-138, 30],
          zoom: 3,
          map: map
        });

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
