<template>
  <el-card class="quirePanel">
    <div slot="header">
      <span>视图查询</span>
        <el-button
        style="float: right; padding: 3px 0"
        type="text"
        @click="chanceIfQuire()"
        >X</el-button><br/>
      <el-dropdown >
        <span class="layerquire">
          {{whichLayerquery.title}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" class="Layer-list"  >
          <el-dropdown-item
          class="Layer-list-li"
          v-for="trem in listdataNew"
          :key="trem.id"
          >
          <span 
            @click="[
              queryFLlist(thisview,whichLayerquery.oldlayerid,trem.id,querywatch),
              trem.visible=true,
              whichLayerquery= {title:trem.title,oldlayerid:trem.id,featureInfoField:trem.featureInfoField}
            ]"
          >{{trem.title}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span style="padding-left:30%">
        总数:{{queryFLlistdataSum}}
      </span><br/>
    </div>
    <el-table
      :data="queryFLlistdata"
      @row-click='gotoThisElement'
      height="500"
      class="quireFLlist">
      <el-table-column
        :prop="'attributes.'+whichLayerquery.featureInfoField"
        label="要素标题"
        >
      </el-table-column>
    </el-table>

  </el-card>
</template>

<script>
export default {
  name:'layerQuery',
  props:[
    'thisview'
  ],
  data(){
    return{
      listdata: window.arcgis.layersList,
      whichLayerquery:{title:'请选择图层',oldlayerid:"",featureInfoField:''},
      querywatch: {},
      queryFLlistdata:[],
    }
  },
  computed:{
    listdataNew:function(){
      return this.listdata.filter(item=>item.type!='geojsonURL')
    },
    queryFLlistdataSum:function(){
      return this.queryFLlistdata.length
    }
  },
  methods:{
    //这是属性列表反馈
    queryFLlist(view,oldid,id,oldQuery){
      //关闭老要素图层，并打开新的要素图层，
      //PS:新老要素图层一样时不操作，老要素为空时不操作
      if(oldid==id){null}else{
        if(oldid){
          this.$emit('chance-layers-even',oldid,false);
          //顺便关掉老的视图监听
          oldQuery.remove();
        }
        this.$emit('chance-layers-even',id,true);
      }
      let querydata = this.queryFLlistdata;
      //监听视图属性返回查询结果
      let querywatch = view.watch("updating", function(value){
        querydata.map((team)=>{querydata.shift()});
        let faa = view.map.findLayerById(id+"fea")
        if(!value&&faa){
          faa.queryFeatures({
            geometry: view.extent,
            returnGeometry: true
          }).then(function(results){
            results.features.forEach(element => {
              querydata.push(element)
            });
            //返回图层查询列表
          }).catch(function(error) {
            console.error("query failed: ", error);
          });
        };
      })
      this.querywatch= querywatch;
    },
    //关闭组建本身
    chanceIfQuire(){
      this.$emit('chance-if-quire');
      //还原组件
      if(this.whichLayerquery.oldlayerid===''){null}else{
        this.$emit('chance-layers-even',this.whichLayerquery.oldlayerid,false);
        this.querywatch.remove();
        this.whichLayerquery={title:'请选择图层',oldlayerid:"",featureInfoField:''};
        this.querywatch={};
      };
      //还原图层控制选择
      this.listdata.forEach(
        (team)=>{
          team.visible=false;
          this.$emit('chance-layers-even',team.id,false);
        }
      )
    },
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

