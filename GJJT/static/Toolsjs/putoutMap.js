// 将地图打印输出的功能模块
define([

], function () {
  return {putoutMapPromise}
  function putoutMapPromise(html2canvas,mapelement,view){
    let getGeometrypromise = new Promise(
      function(resolve, reject){
        putoutMap(html2canvas,mapelement,view,resolve,reject);
      }
    );
    return getGeometrypromise
  };
  function putoutMap(html2canvas,mapelement,view,resolve,reject){
    let extent = view.extent;
    mapelement.style.zIndex = 100;
    mapelement.style.height = '150%';
    mapelement.style.width = '150%';
    view.zoom = 10
    var watchPutoutMap = view.watch("updating", function(value){
      if(!value){
        html2canvas(
          mapelement,
          {
            seCORS : true,
            foreignObjectRendering : true,
            allowTaint :false,
            logging:false
          }
        ).then(
          canvas=>{
            mapelement.style.zIndex = '';
            mapelement.style.height = '100%';
            mapelement.style.width = '100%';
            view.extent=extent;
            resolve(canvas.toDataURL());
            watchPutoutMap.remove();
          }
        )
      }
    })
  };
})