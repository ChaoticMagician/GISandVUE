<template>
  <div class="eleMap" style="height: 100%;">
    <div id="viewDiv"></div>
    <div id="menu" class="esri-widget">
      <input type="checkbox" id="opacityInput" checked>
      <label for="opacityInput">See through ground</label>
      <button id="undergroundBtn">Go underground</button>
    </div>
  </div>
</template>

<script>
import * as esriLoader from 'esri-loader'
export default {
  name: 'groundDemo',
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
        "esri/WebScene",
        "esri/views/SceneView",
        "dojo/domReady!"
      ]).then(([WebScene, SceneView]) => {
        //map代码开始锚点
        let map = new WebScene({
          portalItem: {
            id: "0359bb9202614d7ca2bd0acc278422d6"
          }
        });
        let view = new SceneView({
          container:"viewDiv",
          map:map
        });
        view.when(function() {
          // allow navigation above and below the ground
          map.ground.navigationConstraint = {
            type: "none"
          };
          // the webscene has no basemap, so set a surfaceColor on the ground
          map.ground.surfaceColor = "#fff";
          // to see through the ground, set the ground opacity to 0.4
          map.ground.opacity = 0.4;
        });

        document.getElementById("undergroundBtn").addEventListener("click",
          function() {
            // slide 1 of the webscene presentation has a viewpoint that is underground
            view.goTo(map.presentation.slides.getItemAt(1).viewpoint, {
              duration: 1000
            });
          });

      document.getElementById("opacityInput").addEventListener("change",
        function(event) {
          map.ground.opacity = event.target.checked ? 0.4 : 1;
        });

      view.ui.add("menu", "top-right");







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
  #menu {
    padding: 1em;
    text-align: center;
  }

  button {
    display: block;
    margin: 0 auto;
    margin-top: 1em;
  }
</style>
