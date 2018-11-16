define([
    "esri/layers/FeatureLayer",
    "esri/geometry/Point",
    "esri/geometry/Polyline",
    "esri/geometry/Polygon",
], function(FeatureLayer, Point,Polyline,Polygon) {
    return {
        geojsonDataToGraphics,
        GraphicsToFeatureLayer,
        geojsonDataToFeature
    };
    
    //创建geojson转成graphic集合，依据不同的要素类型创建不同的要素graphic；
    function geojsonDataToGraphics(geojsonData){
        return geojsonData.features.map(
            (feature)=>{
                let attributes = feature.properties;
                let Graphic = {}
                //如果要素是点要素，type为Point
                if(feature.geometry.type==='Point'){
                    Graphic ={
                        geometry: new Point({
                            x: feature.geometry.coordinates[0],
                            y: feature.geometry.coordinates[1]
                        }),
                        attributes
                    };
                }else if(feature.geometry.type==='MultiLineString'){
                    Graphic ={
                        geometry: new Polyline({
                            paths:feature.geometry.coordinates[0]
                        }),
                        attributes
                    };
                }else if(feature.geometry.type==='MultiPolygon'){
                    Graphic ={
                        geometry: new Polygon({
                            rings:feature.geometry.coordinates[0]
                        }),
                        attributes
                    };
                }else(console.error("无法匹配geojsonData要素类型，请核实geojsonData数据是否正确"));
                return Graphic;
            }
        )
    };
    //将graphic集合转成FeatureLayer，PS：必须需要创建字段类型对照表；
    function GraphicsToFeatureLayer(Graphics,id,title,opacity,visible,titleField,renderjson){
        //创建字段类型对照表
        let fields = _getfields(Graphics);
        let popupTemplate =_getpopufields(fields,titleField)
        //在renderjson参数为空的情况下，用模块内的默认渲染器
        let thisrenderer = renderjson||_getRenderer(Graphics[0].geometry.type);

        let layer = new FeatureLayer({
            id,
            title,
            opacity,
            visible,
            keyID:titleField,
            geometryType: Graphics[0].geometry.type,
            source: Graphics,
            fields,
            objectIdField: "OBJECTID",
            renderer: thisrenderer,
            popupTemplate
        });
        return layer;
    };
    //将graphic集合转成FeatureLayer，主要做为属性图层
    function geojsonDataToFeature(geojsonData,id,titleField){
        //用geojsonData创建Graphics
        let Graphics = geojsonDataToGraphics(geojsonData);
        //创建字段类型对照表
        let fields = _getfields(Graphics);
        let popupTemplate =_getpopufields(fields,titleField)
        let layer = new FeatureLayer({
            id,
            keyID:titleField,
            geometryType: Graphics[0].geometry.type,
            source: Graphics,
            fields,
            objectIdField: "OBJECTID",
            popupTemplate
        });
        return layer;
    };
    //创建字段类型对照表
    function _getfields(Graphics){
        let fields = [];
        for (const key in Graphics[0].attributes) {
            if (Graphics[0].attributes.hasOwnProperty(key) === true ) {
                if(key ==="OBJECTID"){
                    fields.push({name: key,alias: key,type: "oid"})
                }else if(typeof(Graphics[0].attributes[key])==="number"){
                    fields.push({name: key,alias: key,type: "double"})
                }
                else{
                    fields.push({name: key,alias: key,type: "string"})
                }
            }
        };
        return fields;
    };
    //创建弹窗字段
    function _getpopufields(fields,titleField=fields[1].name){
        let fieldInfos = fields.map(field=>{return {fieldName:field.name,label:field.name,visible:true}});
        let popufields = {
            title:"{"+titleField+"}信息",
            content:[{
                type:"fields",
                fieldInfos
            }],
        };
        return popufields;
    };
    //返回默认渲染器
    function _getRenderer(geometryType){
        let allRenderer ={
            point:{
                type: "simple", 
                symbol: {
                    type: "simple-marker", 
                    color: [226, 119, 40],
                    outline: { 
                        color: [255, 255, 255],
                        width: 2
                    }
                },
            },
            polyline:{
                type: "simple", 
                symbol: {
                    type: "simple-line",
                    color: [226, 119, 40],
                    width: 4
                },
            },
            polygon:{
                type: "simple", 
                symbol: {
                    type: "simple-fill",
                    color: [227, 139, 79, 0.8],
                    outline: { 
                        color: [255, 255, 255],
                        width: 1
                    }
                }
            },
        }
        return allRenderer[geometryType] ;
    }
});