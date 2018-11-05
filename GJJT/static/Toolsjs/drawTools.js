define([
  'esri/geometry/Multipoint',
  'esri/geometry/Polyline',
  'esri/geometry/Polygon',
  'esri/layers/GraphicsLayer',
  "esri/geometry/geometryEngine"
], function (Multipoint,Polyline,Polygon,GraphicsLayer,geometryEngine) {
  let type = '';
  let view = {};
  let buffer = 0;
  let bufferGeometry={};
  return { drawGeometryPromise,geometryGraphic }
  //封装drawGeometry，并返回方法的promise对象，便于异步操作。
  function drawGeometryPromise( type,draw,view,buffer ){
    let getGeometrypromise = new Promise(
      function(resolve, reject){
        drawGeometry(type,draw,view,buffer,resolve,reject);
      }
    );
    return getGeometrypromise
  }
  function drawGeometry(type,draw,view,buffer,resolve,reject) {
    this.type = type;
    this.view = view;
    view.graphics.removeAll();
    //判断画图类型创建绘画事件
    const action = draw.create(this.type);
    //创建绘图图层
    let proplayer = this.view.map.findLayerById('drawToolsGraphicsLayer');
    this.view.map.remove(proplayer);
    let GrLayer = new GraphicsLayer({
      id:'drawToolsGraphicsLayer'
    });
    this.view.map.add(GrLayer);
    //将全局变量赋予action，并在成为回调函数的全局变量
    action.type = this.type;
    action.buffer = buffer;
    action.bufferGeometry = this.bufferGeometry;
    action.resolve = resolve;
    action.GrLayer = GrLayer;
    this.view.focus();
    action.on("vertex-add", _createBufferGraphic);
    action.on("vertex-remove", _createBufferGraphic);
    action.on("cursor-update", _createBufferGraphic);
    action.on("redo", _createBufferGraphic);
    action.on("undo", _createBufferGraphic);
    action.on("draw-complete", _createBufferGraphic);
  }
  function _createBufferGraphic(event){

    this.GrLayer.graphics.removeAll();
    let Graphic = {}
    if(this.type==='multipoint'){
      Graphic ={
        geometry: new Multipoint({
          points: event.vertices,
          spatialReference: this.view.spatialReference
        }),
        symbol: {
          type: "simple-marker", 
          color: '#4169E1',
          size: 6,
          outline: {
            width: 0.3,
            color: "darkblue"
          }
        }
      };
    }else if(this.type==='polyline'){
      Graphic ={
        geometry: new Polyline({
          paths: event.vertices,
          spatialReference: this.view.spatialReference
        }),
        symbol: {
          type: "simple-line", 
          color: '#4169E1',
          width: 3,
          cap: "round",
          join: "round"
        }
      };
    }else if(this.type==='polygon'){
      Graphic ={
        geometry: new Polygon({
          rings: event.vertices,
          spatialReference: this.view.spatialReference
        }),
        symbol: {
          type: "simple-fill", 
          color: [135,206,250,0.5],
          outline: { 
            color: '#4169E1',
            width: 1
          }
        }
      };
    }else(console.error("无法匹配geojsonData要素类型，请核实geojsonData数据是否正确"));
    //判断是不是多边形，如果不是多边形就拥有扩展区,并且最终把图形赋予全局变量bufferGeometry
    if(this.type==='polygon'){
      this.GrLayer.graphics.add(Graphic)
      this.bufferGeometry = Graphic.geometry;
    }else{
      let buffer = geometryEngine.geodesicBuffer(Graphic.geometry, this.buffer, "meters",true);
      let bufferGraphic ={
          geometry: buffer,
          symbol: {
            type: "simple-fill", 
            color: [135,206,250,0.5],
            outline: { 
              color: '#4682B4',
              width: 1
            }
          }
        };
      this.GrLayer.graphics.addMany([Graphic,bufferGraphic]);
      this.bufferGeometry = buffer;
    };
    if(event.type==="draw-complete"){
      this.resolve(this.bufferGeometry);
    }
  };
  //用geometry（几何体）创建Graphic（图形）
  function geometryGraphic(geometry){
    let Graphic = {}
    if(geometry.type==='point'){
      Graphic ={
        geometry:geometry,
        symbol: {
          type: "simple-marker", 
          color: '#FA8072',
          size: 6,
          outline: {
            width: 0.3,
            color: "darkblue"
          }
        }
      };
    }else if(geometry.type==='polyline'){
      Graphic ={
        geometry:geometry,
        symbol: {
          type: "simple-line", 
          color: '#FA8072',
          width: 3,
          cap: "round",
          join: "round"
        }
      };
    }else if(geometry.type==='polygon'){
      Graphic ={
        geometry:geometry,
        symbol: {
          type: "simple-fill", 
          color: [135,206,250,0.5],
          outline: { 
            color: '#FA8072',
            width: 1
          }
        }
      };
    }else(console.error("无法匹配geojsonData要素类型，请核实geojsonData数据是否正确"));
    return Graphic;
  }
});