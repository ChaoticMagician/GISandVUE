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
          <el-table
            :data="queryFLlistdata"
            @row-click='gotoThisElement'
            height="450"
            class="quireFLlist">
            <el-table-column
              :prop="'attributes.'+queryFLlistdataKey"
              :label="'总数'+queryFLlistdataSum"
              >
            </el-table-column>
          </el-table>
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
    'thisview'
  ],
  data(){
    return{
      listdata: window.arcgis.layersList,
      draw:{},
      queryFLlistdata:[],
      queryFLlistdataKey:'',
      bufferValue:100,
      layerId:'',
      queryGeometry: this.thisview.extent,
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
          return "selectLayers"
        }else{
          return this.layerId
        }
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
          this.getQueryData(this.thisview,this.layerIda,this.queryGeometry)
        })
      })
    },
    //页签被点击事件
    chanceTabPane(event){
      this.layerId = event.name;
      this.getQueryData(this.thisview,this.layerIda,this.queryGeometry)
    },
    //传入图层、面图形、筛选字段，来查询覆盖面内要素
    getQueryData(thisview,layerId,queryGeometry,definitionExpression){
      this.queryFLlistdata = [];
      let faa = thisview.map.findLayerById(layerId+"fea");
      if(layerId!=='selectLayers'&&faa&&queryGeometry!={}){
        var query = faa.createQuery();
        query.geometry = queryGeometry;
        query.returnGeometry = true;
        this.queryFLlistdataKey = faa.keyID;
        let queryFLlistdata = this.queryFLlistdata;
        faa.queryFeatures(query)
        .then(function(results){
          results.features.forEach(element => {
            queryFLlistdata.push(element)
          });
        });
      }else{
        if(layerId=='selectLayers'){this.$message('请选择图层');}
        else if(queryGeometry=={}){this.$message('请绘制缓冲区');}
      }
    },
    //关闭组建本身
    chanceIfQuire(){
      //重置组建，删除添加的drawToolsGraphicsLayer（画扩展区的图形图层），重置全局变量
      this.thisview.map.remove(this.thisview.map.findLayerById('drawToolsGraphicsLayer'));
      this.queryGeometry = this.thisview.extent;
      this.bufferValue = 100;
      this.definitionExpression = '';
      //关闭显示
      this.$emit('chance-if-quire');
    },
    chancelayersVisible(row,event,column){
      row.visible=true;
      this.layerId = row.id ;
      this.$emit('chance-layers-even',row.id,true,this.getQueryData);
    },
    chancelayersUnvisible(id){
      this.listdata.forEach(element => {
        if (element.id===id) {
          element.visible=false
        }
      });
      this.layerId = '' ;
      this.$emit('chance-layers-even',id,false);
    },
    //定位元素,并且打开弹窗,并在绘图层添加样式
    gotoThisElement(row,event,column){
      let view = this.thisview
      let getlocation = function(row){
        switch(row.geometry.type){
          case "point"   :return row.geometry;break;
          case "polyline":return row.geometry.extent.center;break;
          case "polygon" :return row.geometry.centroid;break;
        }
      };
      let location=getlocation(row);
      view.goTo(row.geometry).then(function() {
        view.popup.open({
          features: [row],  
          featureMenuOpen: true, 
          location
        });
      });
      //移除视图的图形层
      this.thisview.graphics.removeAll();
      //创建图形
      esriLoader.loadModules([
        "/static/Toolsjs/drawTools.js",
      ]).then(([drawTools])=>{
        let graphic = drawTools.geometryGraphic(row.geometry);
        this.thisview.graphics.add(graphic)
      })
    },
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

