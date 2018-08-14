/*
arcgis初始化配置
*/
export function arcgisConfig () {
  var DEG = $feature.WIND_DIRECT;
  var SPEED = $feature.WIND_SPEED;
  var DIR = When( SPEED == 0, null,
    (DEG < 22.5 && DEG >= 0) || DEG > 337.5, 'N',
    DEG >= 22.5 && DEG < 67.5, 'NE',
    DEG >= 67.5 && DEG < 112.5, 'E',
    DEG >= 112.5 && DEG < 157.5, 'SE',
    DEG >= 157.5 && DEG < 202.5, 'S',
    DEG >= 202.5 && DEG < 247.5, 'SW',
    DEG >= 247.5 && DEG < 292.5, 'W',
    DEG >= 292.5 && DEG < 337.5, 'NW', null );
  var WIND = SPEED + ' mph ' + DIR;
  var TEMP = Round($feature.TEMP) + '° F';
  var RH = $feature.R_HUMIDITY + '% RH';
  var NAME = $feature.STATION_NAME;
  var labels = [ NAME, TEMP, WIND, RH ];
  return Concatenate(labels, TextFormatting.NewLine);
}
