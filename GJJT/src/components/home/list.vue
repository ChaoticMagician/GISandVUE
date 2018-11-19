<template>
  <el-col :span="12" class="list" >
    <img id="list-img" src="@/assets/logo.png" alt="">
    <el-menu
      class="el-menu-vertical-demo"
      :router="true">
      <el-menu-item index="1" >
        <i class="el-icon-menu"></i>
        <span slot="title">线路编辑</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">辅助规划</span>
      </el-menu-item>
      <el-menu-item index="3" route="/home/default">
        <i class="el-icon-document"></i>
        <span slot="title">规划评价</span>
      </el-menu-item>
      <el-menu-item index="4" route="/home/graphmap">
        <i class="el-icon-setting"></i>
        <span slot="title">空间分析</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</template>

<script>
export default {

  name:'list',
  data(){
      return{

      }
  }
}
</script>

<style scoped>
.list{
  position: fixed;
  z-index: 12;
  width: 130px;
  top: 120px;
  left: 15px;
}
#list-img{
    margin: 0 0 0 35px;
    width: 75px;
    height: 75px;
}
.el-menu {
    border: solid 0px #e6e6e6;
}
</style>
