<template>
  <el-card class="putoutmap">
    <div slot="header">
      <span>地图输出</span>
        <el-button
        style="float: right; padding: 3px 0"
        type="text"
        @click="chanceIfPutout()"
        >X</el-button><br/>
    </div>
    <el-dropdown 
      @command='command=>putoutGrade=command'
    >
      <span class="el-dropdown-link">
        输出层级  {{putoutGrade}} <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command='10'>10</el-dropdown-item>
        <el-dropdown-item command='12'>12</el-dropdown-item>
        <el-dropdown-item command='14'>14</el-dropdown-item>
        <el-dropdown-item command='16'>16</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown 
      @command='command=>putoutsize=command'
    >
      <span class="el-dropdown-link">
         输出大小  {{putoutsize}} <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command='biger'>biger</el-dropdown-item>
        <el-dropdown-item command='middle'>middle</el-dropdown-item>
        <el-dropdown-item command='litter'>litter</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown><br/>
    <el-col :span="4" :offset="9">
      <el-button type="primary" size='small' round>地图输出</el-button>
    </el-col>
  </el-card>
</template>

<script>
import html2canvas from 'html2canvas';
export default {
  name:'putoutmap',
  props:[
    'thisview'
  ],
  data(){
    return{
      putoutGrade:10,
      putoutsize:'middle',
      extentarr:{
        biger:{
          height:'2200px',
          width:'5000px',
          10:{
            xmin:117.45604303790252,
            ymin:38.89502028165135,
            xmax:117.9491884789352,
            ymax:39.166627506476026,
          },
          12:{
            xmin: 116.60,
            ymin: 38.62,
            xmax: 118.19,
            ymax: 39.24,
          },
          14:{
            xmin: 116.60,
            ymin: 38.62,
            xmax: 118.19,
            ymax: 39.24,
          },
          16:{
            xmin: 116.60,
            ymin: 38.62,
            xmax: 118.19,
            ymax: 39.24,
          },
        },
        middle:{
          height:'1800px',
          width:'4000px',
          10:{
            xmin:117.51159906116213,
            ymin:38.874786915155575,
            xmax:118.00474450219481,
            ymax:39.14639413998025,
          },
          12:{
            xmin: 116.60,
            ymin: 38.62,
            xmax: 118.19,
            ymax: 39.24,
          },
          14:{
            xmin: 116.60,
            ymin: 38.62,
            xmax: 118.19,
            ymax: 39.24,
          },
          16:{
            xmin: 116.60,
            ymin: 38.62,
            xmax: 118.19,
            ymax: 39.24,
          },
        },
        litter:{
          height:'1400px',
          width:'3000px',
          10:{
            xmin: 117.14842727948366,
            ymin: 38.79419638758766,
            xmax: 117.64157272051634,
            ymax: 39.06580361241234,
          },
          12:{
            xmin: 116.60,
            ymin: 38.62,
            xmax: 118.19,
            ymax: 39.24,
          },
          14:{
            xmin: 116.60,
            ymin: 38.62,
            xmax: 118.19,
            ymax: 39.24,
          },
          16:{
            xmin: 116.60,
            ymin: 38.62,
            xmax: 118.19,
            ymax: 39.24,
          },
        },
      }
    }
  },
  methods:{
    //关闭自身
    chanceIfPutout(){
      this.$emit('chance-if-putout');
    },
    //创建截图
    
  },
}

</script>

<style scoped>
  /* 属性地图输出工具面板区域样式区域 */
  .putoutmap{
    position: relative;
    top: -90%;
    left: -1.6%;
  }
  .putoutmap .el-dropdown{
    padding-left:10% 
  }
</style>

