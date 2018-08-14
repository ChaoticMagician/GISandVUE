<template>
  <div class="eleMap" style="height: 100%;">
    <div id="viewDiv"></div>
  </div>
</template>

<script>
import * as  esriLoader from 'esri-loader'
export default {
  name: 'AddLabelsFeatureLayer',
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
      const options = {
        dojoConfig:{
          has:{
            "esri-featurelayer-webgl": 1
          }
        }
      };
      // 引入依赖
      esriLoader.loadModules([
        "esri/WebMap",
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
        "esri/widgets/Search",
        "dojo/domReady!"
      ]).then(([WebMap, MapView,FeatureLayer,Search]) => {
       const labelClass = {
          symbol: {
            type: "text", // autocasts as new TextSymbol()
            color: "green",
            haloColor: "black",
            font: { // autocast as new Font()
              family: "playfair-display",
              size: 12,
              weight: "bold"
            }
          },
          labelPlacement: "above-center",
          labelExpressionInfo: {
            expression: "$feature.MARKER_ACTIVITY"
          }
        }

        const map = new WebMap({
          portalItem: { // autocasts as new PortalItem
            id: "372b7caa8fe340b0a6300df93ef18a7e"
          },
          layers:[
            
            new FeatureLayer({
              portalItem:{
                id: '6012738cd1c74582a5f98ea30ae9876f'
              },
              labelingInfo:[{
                symbol: {
                  type: "text", // autocasts as new TextSymbol()
                  color: "green",
                  haloColor: "black",
                  font: { // autocast as new Font()
                    family: "playfair-display",
                    size: 12,
                    weight: "bold"
                  }
                },
                labelPlacement: "above-center",
                labelExpressionInfo: {
                  expression: "$feature.NAME"
                }
              }],
              renderer:{
                type:'simple',
                symbol:{
                  type:'simple-marker',
                  color:'rgba(0,100,0,0.6)',
                  size:7,
                  outline:{
                    color: [0, 0, 0, 0.5],
                    width: 0.5
                  }
                }
              }
            })
          ]
        });
        const view = new MapView({
          container:'viewDiv',
          map: map,
          center: [-116.9250, 34.2501],
          zoom: 14
        });
        view.ui.add(
          new Search({
            view: view
          }),'top-right'
        );
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
