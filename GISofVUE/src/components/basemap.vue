<template>
  <div class="eleMap" style="height: 100%;">
    <div id="viewDiv"></div>
  </div>
</template>

<script>

import esriLoader from 'esri-loader'
export default {
  name: 'basemap',
  data () {
    return {
      map: null,
      view: null
    }
  },
  mounted () {
    this.createMap()
  },
  methods: {
    createMap () {
      // 引入依赖
      esriLoader.loadModules([
        'esri/Map',
        'esri/views/MapView'
      ]).then(([EsriMap, MapView]) => {
        this.map = new EsriMap({
          basemap: 'streets'
        })
        this.view = new MapView({
          container: 'viewDiv',
          center: [121.27189573730267, 30.8419595372876],
          zoom: 3,
          map: this.map
        })
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
