"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fjList = exports.responsetList = exports.delTarget = exports.targetSaveOrEdit = exports.targetList = exports.delSign = exports.signSaveOrEdit = exports.signList = exports.staList = exports.deviceList = void 0;

var _config = _interopRequireDefault(require("./config"));

var _qs = _interopRequireDefault(require("qs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 设备
var deviceList = function deviceList(params) {
  return _config["default"].get('/common/queryDeviceList', {
    params: params
  });
}; // 基站


exports.deviceList = deviceList;

var staList = function staList() {
  return _config["default"].get('/common/queryStaList');
}; // 签约管理


exports.staList = staList;

var signList = function signList(params) {
  return _config["default"].get('/side/getList', {
    params: params
  });
};

exports.signList = signList;

var signSaveOrEdit = function signSaveOrEdit(dataobj) {
  return (0, _config["default"])({
    url: '/side/saveOrEdit',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: dataobj
  });
};

exports.signSaveOrEdit = signSaveOrEdit;

var delSign = function delSign(dataobj) {
  return (0, _config["default"])({
    url: '/side/del',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: dataobj
  });
}; // 指标管理


exports.delSign = delSign;

var targetList = function targetList(params) {
  return _config["default"].get('/target/getList', {
    params: params
  });
};

exports.targetList = targetList;

var targetSaveOrEdit = function targetSaveOrEdit(dataobj) {
  return (0, _config["default"])({
    url: '/target/saveOrEdit',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: dataobj
  });
};

exports.targetSaveOrEdit = targetSaveOrEdit;

var delTarget = function delTarget(dataobj) {
  return (0, _config["default"])({
    url: '/target/del',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: dataobj
  });
}; // 响应评估 fjList


exports.delTarget = delTarget;

var responsetList = function responsetList(params) {
  return _config["default"].get('/settle/getList', {
    params: params
  });
};

exports.responsetList = responsetList;

var fjList = function fjList(params) {
  return _config["default"].get('/target/decomposeShow', {
    params: params
  });
};

exports.fjList = fjList;