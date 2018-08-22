<template>
  <div class="eleMap" style="height: 100%;">
    <div id="optionsDiv">
      <button id="default">Default flight</button>
      <button id="linearSlow">Linear slow flight</button>
      <button id="linearFast">Linear fast flight</button>
      <button id="expoIncrease">Exponentially increasing speed flight</button>
      <button id="fixedDuration">10 seconds flight</button>
      <button id="bounceBerlin">Bounce to Berlin</button>
    </div>
    <div id="viewDiv"></div>
  </div>
</template>

<script>
import * as esriLoader from 'esri-loader'
export default {
  name: 'scenemap',
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
        "esri/Map",
        "esri/views/SceneView",
        "dojo/query",
        "dojo/on",
        "dojo/domReady!"
      ]).then(([Map,SceneView,query,on]) => {
        //map代码开始锚点
        var map = new Map({
          basemap:'dark-gray'
        });
        var view = new SceneView({
          container:'viewDiv',
          map:map,
          zoom:4
        });
        function shiftCamera(deg) {
          var camera = view.camera.clone();
          camera.position.longitude += deg;
          return camera;
        }

        on(dojo.query("#default"), "click", function() {
          // Don't set any animation options for a default camera flight
          view.goTo(shiftCamera(60));
        });

        on(dojo.query("#linearSlow"), "click", function() {
          view.goTo(shiftCamera(60),
            // Animation options for a slow linear camera flight
            {
              speedFactor: 0.1,
              easing: "linear"
            });
        });

        on(dojo.query("#linearFast"), "click", function() {
          view.goTo(shiftCamera(60),
            // Animation options for a fast linear camera flight
            {
              speedFactor: 6,
              easing: "linear"
            });
        });

        on(dojo.query("#expoIncrease"), "click", function() {
          view.goTo(shiftCamera(60),
            // Animation options for a camera flight with an increasing speed
            {
              duration: 4000,
              easing: "in-expo"
            });
        });

        on(dojo.query("#fixedDuration"), "click", function() {
          view.goTo(shiftCamera(30), {
            duration: 10000,
            maxDuration: 10000 // Make sure to set maxDuration if the duration is bigger than 8000 ms
          });
        });

        // Define your own function for the easing option
        function customEasing(t) {
          return 1 - Math.abs(Math.sin(-1.7 + t * 4.5 * Math.PI)) * Math.pow(
            0.5, t * 10);
        }

        on(dojo.query("#bounceBerlin"), "click", function() {
          view.goTo({
            position: {
              x: 13.40,
              y: 52.52,
              z: 700000,
              spatialReference: {
                wkid: 4326
              }
            },
            heading: 0,
            tilt: 0
          }, {
            speedFactor: 0.3,
            easing: customEasing
          });
        });




        //map代码结束锚点
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
  #optionsDiv {
    position: absolute;
    bottom: 17px;
    width: 100%;
    padding: 20px 0;
    z-index: 1;
    text-align: center;
  }

  button {
    background: white;
    padding: 7px;
    border: 1px solid #005e95;
    font-size: 0.9em;
    margin: 5px;
    color: #005e95;
    font-family: "Avenir Next W01", "Arial", sans-serif;
  }
  button:hover {
    background: #005e95;
    color: white;
    cursor: pointer;
  }
</style>
