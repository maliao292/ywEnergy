"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.screenJzLine = exports.screenChhd = exports.screenServer = exports.screenCLine = exports.screenFLine = exports.screenMidData = exports.controlPassData = exports.controlQx = exports.controlerPort = exports.mapLineData = exports.stationDetailApi = exports.topNum = exports.mapMarker = exports.mapTree = exports.login = void 0;

var _config = _interopRequireDefault(require("./config"));

var _qs = _interopRequireDefault(require("qs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 登录
 * @param {*} dataobj 
 */
var login = function login(dataobj) {
  return _config["default"].post('/login', _qs["default"].stringify(dataobj));
}; // export let logout = dataobj => axios.post('/logout',qs.stringify(dataobj));
// 地图树


exports.login = login;

var mapTree = function mapTree(dataobj) {
  return _config["default"].post('/index/queryTree', _qs["default"].stringify(dataobj));
}; // 地图 marker


exports.mapTree = mapTree;

var mapMarker = function mapMarker(dataobj) {
  return _config["default"].post('/index/queryView', _qs["default"].stringify(dataobj));
}; //信息统计TOP 


exports.mapMarker = mapMarker;

var topNum = function topNum(_) {
  return _config["default"].post('/index/queryTop');
}; // 站点详情


exports.topNum = topNum;

var stationDetailApi = function stationDetailApi(dataobj) {
  return _config["default"].post('/index/queryInfo', _qs["default"].stringify(dataobj));
}; // 地图详情折线图GET /analysis/jzfh


exports.stationDetailApi = stationDetailApi;

var mapLineData = function mapLineData(dataobj) {
  return _config["default"].get('/analysis/jzfh?stationId=' + dataobj.stationId + '&queryDate=' + dataobj.queryDate);
}; // 空调/电池控制


exports.mapLineData = mapLineData;

var controlerPort = function controlerPort(_ref) {
  var stationId = _ref.stationId,
      type = _ref.type,
      isOpen = _ref.isOpen;
  return _config["default"].get('/switch/air?stationId=' + stationId + '&type=' + type + '&isOpen=' + isOpen);
}; // 空调电池权限


exports.controlerPort = controlerPort;

var controlQx = function controlQx(_) {
  return _config["default"].get('/switch/ifSwitch');
}; // 空调电池密码 switchPass


exports.controlQx = controlQx;

var controlPassData = function controlPassData(_ref2) {
  var switchPass = _ref2.switchPass;
  return _config["default"].get('/switch/switchPass?switchPass=' + switchPass);
}; // 大屏数据


exports.controlPassData = controlPassData;

var screenMidData = function screenMidData(_) {
  return _config["default"].post('/screen/queryMiddle');
}; // 负荷折线


exports.screenMidData = screenMidData;

var screenFLine = function screenFLine(_) {
  return _config["default"].post('/screen/queryLoadChart');
}; // 储能折线


exports.screenFLine = screenFLine;

var screenCLine = function screenCLine(_) {
  return _config["default"].post('/screen/selectEnergyChart');
}; // 能效服务


exports.screenCLine = screenCLine;

var screenServer = function screenServer(_) {
  return _config["default"].post('/screen/queryNXFW');
}; // 储荷互动


exports.screenServer = screenServer;

var screenChhd = function screenChhd(_) {
  return _config["default"].post('/screen/queryHCHD');
}; // 本年节支柱状图


exports.screenChhd = screenChhd;

var screenJzLine = function screenJzLine(_) {
  return _config["default"].post('/screen/queryJZTJ');
};

exports.screenJzLine = screenJzLine;