<template>
  <el-card class="graphmap">
    <div  slot="header">
        <el-button
          class="headerButton"
          type="text"
          @click="$router.push({name: 'listmenu'}) "
        ><i id="remove" class="el-icon-back" ></i></el-button>
      <span class="headertittle" >空间分析</span>
      <el-tooltip  effect="light" placement="bottom">
        <el-checkbox-group 
          v-model="openprojs"
          text-color='#66CCFF'
          :min ="1"
          slot= "content">
          <el-checkbox 
            v-for="(item, index) in computerProj" 
            :key="index+32" 
            :label="item"
            :checked="item.checked"
            >
            {{item.title}}
          </el-checkbox>
        </el-checkbox-group>
        <span class="headerAdd"><i class="el-icon-plus"></i></span>
      </el-tooltip>
    </div>
  <el-tabs
    :value='thisprojs'
    type="card"
    closable
    @tab-remove='tabRemoveEven'
    @tab-click="e=>{thisprojs=e.name}">
    <el-tab-pane
      v-for="(item,index) in openprojs"
      :key="index+13"
      :label="item.title"
      :name="item.name"
      >
      {{item.name}}
    <!-- <component :is=""></component> -->
    </el-tab-pane>
  </el-tabs>


  </el-card>
</template>

<script>
export default {
  name:'graphmap',
  // components: {
  //   historyTab: resolve => {require(['../../component/historyTab/historyTab.vue'], resolve)},//懒加载
  // },
  props:[
    'thisview'
  ],
  data(){
    return{
      computerProj:[{
          title: '热力图',
          name: 'heatmap',
          checked: true
        },
        {
          title: '聚合图',
          name: 'clonemap',
          checked: true
        }],
      openprojs:[],
      thisprojs:'heatmap'
    }
  },
  created() {
  },
  methods: {
    tabRemoveEven(name){
      if(this.openprojs.length > 1){
        this.openprojs.forEach((element,index) => {
          if(element.name === name){
            this.openprojs.splice(index,1);
          };
        });
        //如果删除的是当前选中项，则将数组中的第一项的name作为当前选中项；
          console.log(this.thisprojs,name)
        if(name == this.thisprojs ){
          this.thisprojs = this.openprojs[0].name;
        }
      }else{
        this.$message({
          showClose: true,
          message: '不能关闭最后的空间分析项',
          type: 'warning'
        });
      }
    }
  }
}
</script>

<style >
.graphmap{
  position: fixed;
  z-index: 12;
  width: 300px;
  height: 500px;
  top: 120px;
  left: 15px;
}
.headerButton{
  float: left;
  padding: 3px 0;
}
.headertittle{
  padding-left: 30%;
}
.headerAdd{
  float: right;
}
.el-checkbox+.el-checkbox{
  display: block;
  margin: 4px 0 4px 0;

}
</style>
