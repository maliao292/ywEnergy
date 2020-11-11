"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = login;
exports.mapTree = mapTree;
exports.mapMarker = mapMarker;
exports.topNum = topNum;
exports.stationDetailApi = stationDetailApi;
exports.screenMidData = screenMidData;
exports.gyTopApi = gyTopApi;
exports.gyLineApi = gyLineApi;
exports.gyBarApi = gyBarApi;
exports.ptType = exports.screenJzLine = exports.screenChhd = exports.screenServer = exports.screenCLine = exports.screenFLine = exports.controlPassData = exports.controlQx = exports.controlerPort = exports.mapLineData = void 0;

var _config = _interopRequireDefault(require("./config"));

var _qs = _interopRequireDefault(require("qs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 登录
 * @param {*} dataobj
 */
// export let login = dataobj => axios.post('/login',qs.stringify(dataobj));
function login(dataobj) {
  return (0, _config["default"])({
    url: '/login',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: dataobj
  });
} // export let logout = dataobj => axios.post('/logout',qs.stringify(dataobj));
// 地图树
// export let mapTree = dataobj => axios.post('/index/queryTree', qs.stringify(dataobj));


function mapTree(dataobj) {
  return (0, _config["default"])({
    url: '/index/queryTree',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: dataobj
  });
} // 地图 marker
//export let mapMarker = dataobj => axios.post('/index/queryView',qs.stringify(dataobj));


function mapMarker(dataobj) {
  return (0, _config["default"])({
    url: '/index/queryView',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: dataobj
  });
} //信息统计TOP
// export let topNum = dataobj => axios.post('/index/queryTop',qs.stringify(dataobj));


function topNum(dataobj) {
  return (0, _config["default"])({
    url: '/index/queryTop',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: dataobj
  });
} // 站点详情
// export let stationDetailApi = dataobj => axios.post('/index/queryInfo',qs.stringify(dataobj));


function stationDetailApi(dataobj) {
  return (0, _config["default"])({
    url: '/index/fiveG/queryInfo',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: dataobj
  });
} // 地图详情折线图GET /analysis/jzfh


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
// export let screenMidData = _ => axios.post('/screen/queryMiddle');


exports.controlPassData = controlPassData;

function screenMidData(dataobj) {
  return (0, _config["default"])({
    url: '/screen/queryMiddle',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: dataobj
  });
} // 负荷折线


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
}; // 平台类型


exports.screenJzLine = screenJzLine;

var ptType = function ptType(_) {
  return _config["default"].get('/common/getUserType');
}; // 工业-智慧电务 


exports.ptType = ptType;

function gyTopApi(dataobj) {
  return (0, _config["default"])({
    url: '/index/wisdomEle/queryInfo',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: dataobj
  });
} // 工业 折线 


function gyLineApi(dataobj) {
  return (0, _config["default"])({
    url: '/index/wisdomEle/getDayChart',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: dataobj
  });
} // 工业 柱状图 


function gyBarApi(dataobj) {
  return (0, _config["default"])({
    url: '/index/wisdomEle/getMonthChart',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: dataobj
  });
}