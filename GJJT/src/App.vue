<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url('http://123.56.17.204:8091/4.9/esri/css/main.css');
#app{
  height: 100%;
  width: 100%;
}

/* 该区域是全局修改element组件样式的区域 */

/* 当前是修改tilemap组件中的图层属性弹窗 */
.quirePanel .el-card__header{
  padding: 8px 20px;
}
.quirePanel .el-card__body{
  padding: 5px 10px;
}
.quireFLlist th{
  padding: 4px 0;
}
.quireFLlist td{
  padding: 4px 0;
}
.quireFLlist table{
  width: 100%;
}
.darwButtens .el-button{
  padding: 7px;
  /* font-size: 15px; */
}
</style>
