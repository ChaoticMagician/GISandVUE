define([
    "esri/Graphic",
    "esri/geometry/Point",
    "esri/geometry/Polyline",
    "esri/geometry/Polygon",
    "esri/geometry/geometryEngine",
], function(Graphic,Point,Polyline,Polygon,geometryEngine) {
    //这个方法是绘制面实现面积测量
    // import * as esriLoader from 'esri-loader'
    return {
        drawPolygonMeasueArea,
        drawPolylineMeasuelong
    };
     function drawPolygonMeasueArea(draw, view){
           var action = draw.create("polygon");
           view.focus();
           action.on("vertex-add", drawPolygon);
           action.on("cursor-update", drawPolygon);
           action.on("vertex-remove", drawPolygon);
           action.on("draw-complete", drawPolygon);
           function drawPolygon(event) {
             var vertices = event.vertices;
             //删除现有的图形
             view.graphics.removeAll();
             //创建一个新的多边形
             var polygon = createPolygon(vertices);
             //将创建的多边形放到绘图层
             var graphic = createGraphic(polygon);
             view.graphics.add(graphic);
             //计算多边形的面积
             var area = geometryEngine.geodesicArea(polygon, "square-kilometers");
             if (area < 0) {
               //如果需要，简化多边形并再次计算面积
               var simplifiedPolygon = geometryEngine.simplify(polygon);
               if (simplifiedPolygon) {
                 area = geometryEngine.geodesicArea(simplifiedPolygon, "square-kilometers");
               }
             }
             //开始显示多边形的面积
             labelAreas(polygon, area);
           }
           //使用提供的顶点创建多边形
           function createPolygon(vertices) {
             return new Polygon({
               rings: vertices,
               spatialReference: view.spatialReference
             });
           }
    
           // 创建一个新的图形，表示在视图上绘制的多边形
           function createGraphic(polygon) {
             var graphic = new Graphic({
               geometry: polygon,
               symbol: {
                 type: "simple-fill", // 自动为SimpleFillSymbol
                 color: [255, 110, 180, 0.6],
                 style: "solid",
                 outline: { // 自动为SimpleLineSymbol
                   color: [4, 90, 141],
                   width: 2
                 }
               }
             });
             return graphic;
           }
    
           //用它的面积标记polyon
           function labelAreas(geom, area) {
             var graphic = new Graphic({
               geometry: geom.centroid,
               symbol: {
                 type: "text",
                 color: "white",
                 haloColor: "black",
                 haloSize: "1px",
                 text: area.toFixed(2) + "平方公里",
                 xoffset: 3,
                 yoffset: 3,
                 font: { 
                   size: 14,
                   family: "sans-serif"
                 }
               }
             });
             view.graphics.add(graphic);
           }
       };
       //这个方法是绘制线实现长度测量
       function drawPolylineMeasuelong(draw, view){
           var action = draw.create("polyline",
           {mode: "click"}
           );
           view.focus();
           action.on("vertex-add", drawPolyline);
           action.on("cursor-update", drawPolyline);
           action.on("vertex-remove", drawPolyline);
           action.on("draw-complete", drawPolyline);
           function drawPolyline(event) {
             //删除现有图形
             view.graphics.removeAll();
             //创建一个新的折线
             var polyline = new Polyline( {
               type: "polyline", // 自动的多段线
               paths: event.vertices,
               spatialReference: view.spatialReference
             });
             //将创建的折线放在绘图层
             var graphic = new Graphic({
               geometry: polyline,
               symbol: {
                 type: "simple-line", // 自动为SimpleLineSymbol
                 color: [4, 90, 141],
                 width: 2,
                 cap: "round",
                 join: "round"
               }
             });
             view.graphics.add(graphic);
             //计算折线的长度
             var long = geometryEngine.geodesicLength(polyline, "meters");
             if (long < 0) {
               //如果需要，简化多边形并再次计算面积
               var simplifiedPolygon = geometryEngine.simplify(polygon);
               if (simplifiedPolygon) {
                 long = geometryEngine.geodesicLength(simplifiedPolygon, "meters");
               }
             };
             //开始显示折线的面积
             labelAreas(polyline, long);
           };
           //用它的面积标记polyon
           function labelAreas(geom, long) {
             var print = new Point({
               type:"point",
               longitude: geom.paths[0][0][0],
               latitude: geom.paths[0][0][1]
             });
             var graphic = new Graphic({
               geometry: print,
               symbol: {
                 type: "text",
                 color: "black",
                 haloColor: "black",
                 haloSize: "1px",
                 text: long.toFixed(2) + "米",
                 xoffset: 3,
                 yoffset: 3,
                 font: { 
                   size: 14,
                   family: "sans-serif"
                 }
               }
             });
             view.graphics.add(graphic);
           }
       };
})
   
   

   