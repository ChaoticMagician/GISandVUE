<template>
  <div class="eleMap" style="height: 100%;">
    <div id="viewDiv"></div>
    <div id="infoDiv">
      <input class="esri-component esri-widget--button esri-widget esri-interactive" type="button"
        id="switch-btn" value="3D">
    </div>
  </div>
</template>

<script>
import * as esriLoader from 'esri-loader'
export default {
  name: 'F2DTo3D',
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
        "esri/views/MapView",
        "esri/views/SceneView",
        "esri/WebMap",
        "esri/WebScene",
        "dojo/domReady!"
      ]).then(([MapView, SceneView, WebMap, WebScene]) => {
        //map代码开始锚点
        var appConfig = {
          mapView: null,
          sceneView: null,
          activeView: null,
          container: "viewDiv" // use same container for views
        };
        var initialViewParams = {
          zoom: 12,
          center: [-122.43759993450347, 37.772798684981126],
          container: appConfig.container
        };
        var webmap = new WebMap({
          portalItem: { // autocasts as new PortalItem()
            id: "7ee3c8a93f254753a83ac0195757f137"
          }
        });
        var scene = new WebScene({
          portalItem: { // autocasts as new PortalItem()
            id: "4f081bc26af2452b91f36fa66ae586c1"
          }
        });

        // create 2D view and and set active
        appConfig.mapView = createView(initialViewParams, "2d");
        appConfig.mapView.map = webmap;
        appConfig.activeView = appConfig.mapView;

        // create 3D view, won't initialize until container is set
        initialViewParams.container = null;
        initialViewParams.map = scene;
        appConfig.sceneView = createView(initialViewParams, "3d");

        // switch the view between 2D and 3D each time the button is clicked
              var switchButton = document.getElementById("switch-btn");
        switchButton.addEventListener("click", function() {
          switchView();
        });
      // Switches the view from 2D to 3D and vice versa
      function switchView() {
        var is3D = appConfig.activeView.type === "3d";

        // remove the reference to the container for the previous view
        appConfig.activeView.container = null;

        if (is3D) {
          // if the input view is a SceneView, set the viewpoint on the
          // mapView instance. Set the container on the mapView and flag
          // it as the active view
          appConfig.mapView.viewpoint = appConfig.activeView.viewpoint.clone();
          appConfig.mapView.container = appConfig.container;
          appConfig.activeView = appConfig.mapView;
          switchButton.value = "3D";
        } else {
          appConfig.sceneView.viewpoint = appConfig.activeView.viewpoint.clone();
          appConfig.sceneView.container = appConfig.container;
          appConfig.activeView = appConfig.sceneView;
          switchButton.value = "2D";
        }
      }

      // convenience function for creating a 2D or 3D view
      function createView(params, type) {
        var view;
        var is2D = type === "2d";
        if (is2D) {
          view = new MapView(params);
          return view;
        } else {
          view = new SceneView(params);
        }
        return view;
      }





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
  #infoDiv {
    position: relative;
    top: -613px;
    left: 60px;
  }

  #infoDiv input {
    border: none;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 2px;
  }
</style>
