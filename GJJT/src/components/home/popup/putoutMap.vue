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
      trigger="click"
      @command='chancePutoutExtengGrade'
    >
      <span>输出层级
        <span class="spanValue">
          {{Gradename[putoutGrade]}} <i class="el-icon-arrow-down"></i>
        </span>
      </span>
      <el-dropdown-menu slot="dropdown"  >
        <el-dropdown-item command='10'>新区</el-dropdown-item>
        <el-dropdown-item command='12'>街道</el-dropdown-item>
        <el-dropdown-item command='14'>社区</el-dropdown-item>
        <el-dropdown-item command='16'>小区</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown 
      trigger="click"
      @command='chancePutoutExtengSize'
    >
      <span>输出大小
        <span class="spanValue">
          {{putoutsize}} <i class="el-icon-arrow-down"></i>
        </span>
      </span> 

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command='biger'>biger</el-dropdown-item>
        <el-dropdown-item command='middle'>middle</el-dropdown-item>
        <el-dropdown-item command='litter'>litter</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown><br/>
    <div class="extentList">
      上：
      <el-input
        disabled
        :style="{width:'140px'}"
        size='mini'
        v-model="thisExtent.ymax">
      </el-input>
      右：
      <el-input
        disabled
        :style="{width:'140px'}"
        size='mini'
        v-model="thisExtent.xmax">
      </el-input>
      下：
      <el-input
        disabled
        :style="{width:'140px'}"
        size='mini'
        v-model="thisExtent.ymin">
      </el-input>
      左：
      <el-input
        disabled
        :style="{width:'140px'}"
        size='mini'
        v-model="thisExtent.xmin">
      </el-input>
    </div>
    <el-col class="puyoutButton" :span="4" :offset="9">
      <el-button
        type="primary"
        size='small'
        round
        @click="putoutMap"
      >地图输出</el-button>
      
    </el-col>
  </el-card>
</template>

<script>
import * as esriLoader from 'esri-loader'
import html2canvas from 'html2canvas';
export default {
  name:'putoutmap',
  props:[
    'thisview'
  ],
  data(){
    return{
      Gradename:{
        10:'新区',
        12:'街道',
        14:'社区',
        16:'小区',
      },
      putoutGrade:10,
      putoutsize:'middle',
      extentarr:{
        biger:{
          height:'2600px',
          width:'5000px',
          10:{
            xmin:116.8250792212681,
            ymin:38.5676641307085,
            xmax:118.53771366669035,
            ymax:39.45724637969234,
          },
          12:{
            xmin:117.46757434211283,
            ymin:38.901086004869846,
            xmax:117.89547574965701,
            ymax:39.12331009790822,
          },
          14:{
            xmin:117.62819812232402,
            ymin:38.98431287150449,
            xmax:117.73523777516291,
            ymax:39.03984746111313,
          },
          16:{
            xmin:117.66835406737681,
            ymin:39.00516245546505,
            xmax:117.69511933899928,
            ymax:39.01905681969268,
          },
        },
        middle:{
          height:'2000px',
          width:'4000px',
          10:{
            xmin:116.99654842885943,
            ymin:38.67020271684812,
            xmax:118.36624445909901,
            ymax:39.35505073196791,
          },
          12:{
            xmin:117.51044164401067,
            ymin:38.92663491680096,
            xmax:117.85295138617437,
            ymax:39.09758971676952,
          },
          14:{
            xmin:117.63893638144943,
            ymin:38.99074296678917,
            xmax:117.72452094968845,
            ymax:39.033524534083206,
          },
          16:{
            xmin:117.67103327374541,
            ymin:39.00676997928621,
            xmax:117.69244549104337,
            ymax:39.01745465428424,
          },
        },
        litter:{
          height:'1400px',
          width:'3000px',
          10:{
            xmin:117.16836057486596,
            ymin:38.77377011823328,
            xmax:118.19477525150768,
            ymax:39.251826268997924,
          },
          12:{
            xmin:117.5533946805123,
            ymin:38.95252676714725,
            xmax:117.81008408427653,
            ymax:39.071869335630815,
          },
          14:{
            xmin:117.64961033962197,
            ymin:38.99715162842289,
            xmax:117.71384699151588,
            ymax:39.02705157149663,
          },
          16:{
            xmin:117.67371248011403,
            ymin:39.01172115265542,
            xmax:117.68976092626204,
            ymax:39.015863205701294,
          },
        },
      },
      extent:{},
      extentClickListen:{},
      symbol: {
        type: "simple-fill", 
        color: [135,206,250,0.5],
        outline: { 
          color: '#FA8072',
          width: 1
        }
      },
      thisExtent:{
        xmin:116.99654842885943,
        ymin:38.67020271684812,
        xmax:118.36624445909901,
        ymax:39.35505073196791,
      },
    }
  },
  computed:{
    centerX:function(){
      let generalX = (this.thisExtent.xmax-this.thisExtent.xmin)/2;
      return this.thisExtent.xmin+generalX;
    },
    centerY:function(){
      let generalY = (this.thisExtent.ymax-this.thisExtent.ymin)/2;
      return this.thisExtent.ymin+generalY;
    },
  },
  created() {
    this.createPutoutExteng(this);
  },
  beforeDestroy() {
    this.extentClickListen.remove();
    let proplayer = this.thisview.map.findLayerById('ToolsGraphicsLayer');
    this.thisview.map.remove(proplayer);
  },
  methods:{
    //关闭自身
    chanceIfPutout(){
      this.$emit('chance-if-putout');
    },
    //创建截图范围
    createPutoutExteng(vm) {
      esriLoader.loadModules([
        'esri/layers/GraphicsLayer',
        "esri/geometry/Extent",
      ]).then(([GraphicsLayer,Extent])=>{
        //创建绘图图层,如具有绘图层则先去除再添加
        let proplayer = vm.thisview.map.findLayerById('ToolsGraphicsLayer');
        vm.thisview.map.remove(proplayer);
        let extent = new Extent({
          xmin: vm.thisExtent.xmin,
          ymin: vm.thisExtent.ymin,
          xmax: vm.thisExtent.xmax,
          ymax: vm.thisExtent.ymax,
          spatialReference: {
            wkid: 4326
          }
        });
        let Graphic ={
          geometry: extent,
          symbol: vm.symbol,
          attributes: {
            keyvalue: "imPutoutMap"
          }
        };
        let GrLayer = new GraphicsLayer({
          id:'ToolsGraphicsLayer'
        });
        vm.thisview.map.add(GrLayer);
        GrLayer.graphics.add(Graphic);
        //创建页面监听,选中需要截图的覆盖面视图
        vm.extentClickListen = vm.thisview.on("click", function(event) {
          let generalX = (vm.thisExtent.xmax-vm.thisExtent.xmin)/2;
          let generalY = (vm.thisExtent.ymax-vm.thisExtent.ymin)/2;
          vm.thisExtent={
            xmin: event.mapPoint.x-generalX,
            ymin: event.mapPoint.y-generalY,
            xmax: event.mapPoint.x+generalX,
            ymax: event.mapPoint.y+generalY,
          };
          let newExtent = new Extent({
            xmin: vm.thisExtent.xmin,
            ymin: vm.thisExtent.ymin,
            xmax: vm.thisExtent.xmax,
            ymax: vm.thisExtent.ymax,
            spatialReference: vm.thisview.spatialReference
          });
          let newGraphic ={
            geometry: newExtent,
            symbol: vm.symbol,
            attributes: {
              keyvalue: "imPutoutMap"
            }
          };
          GrLayer.graphics.removeAll();
          GrLayer.graphics.add(newGraphic);
        })
      })
    },
    //更改图形层级
    chancePutoutExtengGrade(command){
      this.putoutGrade = command;
      this.thisExtent = this.extentarr[this.putoutsize][this.putoutGrade];
      this._chancePutoutExteng(this);
    },
    //更改图形大小
    chancePutoutExtengSize(command){
      this.putoutsize = command
      this.thisExtent = this.extentarr[this.putoutsize][this.putoutGrade];
      this._chancePutoutExteng(this);
    },
    //更新图形
    _chancePutoutExteng(vm){
      esriLoader.loadModules([
        "esri/geometry/Extent",
      ]).then(([Extent])=>{
        let extent = new Extent({
          xmin: vm.thisExtent.xmin,
          ymin: vm.thisExtent.ymin,
          xmax: vm.thisExtent.xmax,
          ymax: vm.thisExtent.ymax,
          spatialReference: vm.thisview.spatialReference
        });
        let Graphic ={
          geometry: extent,
          symbol: vm.symbol
        };
        //移除视图的图形层,添加新图形
        let proplayer = vm.thisview.map.findLayerById('ToolsGraphicsLayer');
        proplayer.graphics.removeAll();
        proplayer.graphics.add(Graphic);
      })
    },
    //下载
    _downloadFile(fileName, content) {
      let aLink = document.createElement('a');
      let blob = this._base64ToBlob(content); //new Blob([content]);
      let evt = document.createEvent("HTMLEvents");
      aLink.download = fileName;
      aLink.href = URL.createObjectURL(blob);
      evt.initEvent("click", true, true);//initEvent  事件类型，是否冒泡，是否阻止浏览器的默认行为
      aLink.click()
    },
    //base64转blob
    _base64ToBlob(code) {
      let parts = code.split(';base64,');
      let contentType = parts[0].split(':')[1];
      let raw = window.atob(parts[1]);
      let rawLength = raw.length;

      let uInt8Array = new Uint8Array(rawLength);

      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], {type: contentType});
    },
    putoutMap(){
      //创建提示，提示用户等待操作结束。
      let messageRemove = this.$message({
        message: '请耐心等待地图下载，下载完成前请勿操作！',
        type: 'warning',
        duration:0
      });
      let mapElement = this.$parent.$refs.viewDiv;
      let extent = this.thisview.extent;
      let proplayer = this.thisview.map.findLayerById('ToolsGraphicsLayer');
      proplayer.visible = false;
      this.thisview.zoom = this.putoutGrade;
      mapElement.style.zIndex = 100;
      mapElement.style.height = this.extentarr[this.putoutsize].height;
      mapElement.style.width = this.extentarr[this.putoutsize].width;
      this.thisview.center = [this.centerX, this.centerY]; 
      var watchPutoutMap = this.thisview.watch("updating",
        (value)=>{
          if(!value){
            //移除提示
            messageRemove.close();
            html2canvas(
              mapElement,
              {
                seCORS : true,
                foreignObjectRendering : true,
                allowTaint :false,
                logging:false
              }
            ).then(canvas=>{
              mapElement.style.zIndex = '';
              mapElement.style.height = '100%';
              mapElement.style.width = '100%';
              proplayer.visible = true;
              this.thisview.extent=extent;
              watchPutoutMap.remove();
              let imgData = canvas.toDataURL();
              this._downloadFile('输出地图.png',imgData)
              }).catch(err=>{
              if(messageRemove.close){messageRemove.close();}
              console.error(err);
            })
          }
        }
      )
    }
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
  .spanValue{
    color: rgba(119, 119, 255, 0.89);
  }
  .extentList{
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 14px;
  }
  .puyoutButton{
    margin-bottom:20px; 
  }
</style>

