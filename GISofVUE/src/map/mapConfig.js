/*
arcgis初始化配置
*/
export function arcgisConfig () {
  window.arcgis = {
    config: {
      proxyUrl: 'http://js.arcgis.com/4.9/init.js',
      baseUrl: 'http://123.56.17.204:8091/4.9/init.js',
      dojoUrl: 'http://123.56.17.204:8091/4.8/library/4.7/dojo',
      offlineMapWkid: 26911,
      getBaseUrl: function () {
        return this.baseUrl
      },
      getDojoUrl: function () {
        return this.dojoUrl
      },
      getWkid: function () {
        return this.offlineMapWkid
      }
    }
  }
}
