<template>
  <div class="hello">
    <el-container :style="{height: thisheight}" style=" border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '2']" :router="true">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>地图显示</template>
            <el-menu-item-group>
              <el-menu-item index="1-1" route="basemap">基础地图</el-menu-item>
              <el-menu-item index="1-2" route="AddLabelsFeatureLayer">增加Feature图层</el-menu-item>
              <el-menu-item index="1-3" route="heatmap">热力图</el-menu-item>
              <el-menu-item index="1-4" route="scenemap">三维地图</el-menu-item>
              <el-menu-item index="1-5" route="ViewGoto">ViewGoto</el-menu-item>
              <el-menu-item index="1-6" route="F2DTo3D">F2DTo3D</el-menu-item>
              <el-menu-item index="1-7" route="groundDemo">ground三维</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>地图操作</template>
            <el-menu-item-group>
              <el-menu-item index="2-1" route="drawModel">模型作图</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'index',
  data(){
    return{
      thisheight: '648px'
    }
  },
  mounted(){
    var vm = this;
    vm.getWinHeight();
  },
  methods:{
    getWinHeight(){
      this.thisheight = (window.innerHeight)+'px'
    }
  }
}
</script>
 
<style scoped>
  .el-aside {
    color: #333;
  }
  .el-main{
    padding: 4px;
  }
  .el-menu-item, .el-submenu__title{
    height: 30px;
    line-height: 30px;
  }
</style>
