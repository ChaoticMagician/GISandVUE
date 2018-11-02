define([
  'esri/geometry/Multipoint',
  'esri/geometry/Polyline',
  'esri/geometry/Polygon',
  "esri/geometry/geometryEngine"
], function (Multipoint,Polyline,Polygon,geometryEngine) {
  let type = '';
  let view = {};
  let buffer = 0;
  let bufferGeometry={};
  return { drawGeometryPromise }
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
    //将全局变量赋予action，并在成为回调函数的全局变量
    action.type = this.type;
    action.buffer = buffer;
    action.bufferGeometry = this.bufferGeometry;
    action.resolve = resolve;
    this.view.focus();
    action.on("vertex-add", _createGraphic);
    action.on("vertex-remove", _createGraphic);
    action.on("cursor-update", _createGraphic);
    action.on("redo", _createGraphic);
    action.on("undo", _createGraphic);
    action.on("draw-complete", _createGraphic);
  }
  function _createGraphic(event){
    this.view.graphics.removeAll();
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
      this.view.graphics.add(Graphic)
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
      this.view.graphics.addMany([Graphic,bufferGraphic]);
      this.bufferGeometry = buffer;
    };
    if(event.type==="draw-complete"){
      this.resolve(this.bufferGeometry);
    }
  };
});