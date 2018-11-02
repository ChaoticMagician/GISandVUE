<template>
  <el-card class="quirePanel">
    <div slot="header">
      <span>框选查询</span>
        <el-button
        style="float: right; padding: 3px 0"
        type="text"
        @click="chanceIfQuire()"
        >X</el-button><br/>
      <div class="darwButtens">
        <el-button class="esri-icon-radio-checked" circle @click="drawGeometry('multipoint')"></el-button>
        <el-button class="esri-icon-polyline" circle @click="drawGeometry('polyline')"></el-button>
        <el-button class="esri-icon-polygon" circle @click="drawGeometry('polygon')"></el-button>
        <span style="text-align: center;margin-left:20px;">
          扩展范围:
        <el-input
          size="mini"
          placeholder="请输入内容"
          v-model="bufferValue">
        </el-input>米
        </span>
      </div><br/>
      <el-tabs
        :value="layerIda"
        type="card"
        @tab-remove="chancelayersUnvisible"
        @tab-click="chanceTabPane"
        >
        <el-tab-pane
          v-for="(item) in LayerIsVisible"
          :key="item.id"
          :label="item.title"
          :name="item.id"
          closable
        >
          {{item.title}}
        </el-tab-pane>
        <el-tab-pane
          label="添加图层"
          name="selectLayers"
        >
          <el-table
            :data="LayerNoVisible"
            @row-click='chancelayersVisible'
            height="450"
            class="quireFLlist">
            <el-table-column
              prop="title"
              label="图层名称"
              >
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-card>
</template>

<script>
import * as esriLoader from 'esri-loader'
export default {
  name:'drawQuery',
  props:[
    'thisview',
    'ifDrawquire'
  ],
  data(){
    return{
      listdata: window.arcgis.layersList,
      draw:{},
      queryFLlistdata:[],
      bufferValue:100,
      layerId:'',
      queryGeometry:{},
      definitionExpression:''
    }
  },
  mounted(){
    //实例化draw对象
    esriLoader.loadModules([
      "esri/views/2d/draw/Draw",
    ]).then(([Draw])=>{
      let view = this.thisview;
      this.draw = new Draw({
        view: view
      });
    })
  },
  computed:{
    LayerIsVisible:function(){
      return this.listdata.filter(item=>item.visible&&item.type!='geojsonURL')
    },
    LayerNoVisible:function(){
      return this.listdata.filter(item=>!item.visible&&item.type!='geojsonURL')
    },
    queryFLlistdataSum:function(){
      return this.queryFLlistdata.length
    },
    layerIda:{
      get : function(){
        if(this.LayerIsVisible[0]==null){
          return "selectLayers"
        }else if(this.layerId == ''){
          return this.LayerIsVisible[0].id
        }else{
          return this.layerId
        }
      },
      set : function(newValue){
        this.layerId=newValue
      }
    }
  },
  methods:{
    drawGeometry(type){
      esriLoader.loadModules([
        "/static/Toolsjs/drawTools.js",
      ]).then(([drawTools])=>{

        drawTools.drawGeometryPromise(type,this.draw,this.thisview,this.bufferValue)
        .then((queryGeometry)=>{ 
          this.queryGeometry=queryGeometry;
        })
      })
    },
    //页签被点击事件
    chanceTabPane(event){
      console.log(event.name)
      this.layerId = event.name;
    },
    //传入图层、面图形、筛选字段，来查询覆盖面内要素
    getQueryData(thisview,layerId,queryGeometry,definitionExpression){

    },
    //关闭组建本身
    chanceIfQuire(){
      this.$emit('chance-if-quire');
    },
    chancelayersVisible(row,event,column){
      row.visible=true;
      this.layerId = row.id ;
      this.$emit('chance-layers-even',row.id,true);
    },
    chancelayersUnvisible(id){
      this.listdata.forEach(element => {
        if (element.id===id) {
          element.visible=false
        }
      });
      this.$emit('chance-layers-even',id,false);
    }
  }
}
</script>

<style scoped>
  /* 属性查询面板区域样式区域 */
  .quirePanel{
    position: relative;
    top: -90%;
    left: -1.6%;
  }
  .quireFLlist{
    width:100%；
  }
</style>

