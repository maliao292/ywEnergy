import axios from './config';
import request from './config';
import qs from 'qs'

/**
 * 登录
 * @param {*} dataobj
 */
// export let login = dataobj => axios.post('/login',qs.stringify(dataobj));
export function login(dataobj) {
  return request({
    url: '/login',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: dataobj
  })
}

// export let logout = dataobj => axios.post('/logout',qs.stringify(dataobj));
// 地图树
export let mapTree = dataobj => axios.post('/index/queryTree', qs.stringify(dataobj));
// 地图 marker
//export let mapMarker = dataobj => axios.post('/index/queryView',qs.stringify(dataobj));

export function mapMarker(dataobj) {
  return request({
    url: '/index/queryView',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: dataobj
  })
}

//信息统计TOP
// export let topNum = dataobj => axios.post('/index/queryTop',qs.stringify(dataobj));
export function topNum(dataobj) {
  return request({
    url: '/index/queryTop',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: dataobj
  })
}

// 站点详情
// export let stationDetailApi = dataobj => axios.post('/index/queryInfo',qs.stringify(dataobj));
export function stationDetailApi(dataobj) {
  return request({
    url: '/index/fiveG/queryInfo',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: dataobj
  })
}


// 地图详情折线图GET /analysis/jzfh
export let mapLineData = dataobj => axios.get('/analysis/jzfh?stationId=' + dataobj.stationId + '&queryDate=' + dataobj.queryDate);

// 空调/电池控制
export let controlerPort = ({ stationId, type, isOpen }) => axios.get('/switch/air?stationId=' + stationId + '&type=' + type + '&isOpen=' + isOpen);
// 空调电池权限
export let controlQx = _ => axios.get('/switch/ifSwitch');
// 空调电池密码 switchPass
export let controlPassData = ({ switchPass }) => axios.get('/switch/switchPass?switchPass=' + switchPass);

// 大屏数据
export let screenMidData = _ => axios.post('/screen/queryMiddle');
// 负荷折线
export let screenFLine = _ => axios.post('/screen/queryLoadChart');
// 储能折线
export let screenCLine = _ => axios.post('/screen/selectEnergyChart');
// 能效服务
export let screenServer = _ => axios.post('/screen/queryNXFW');
// 储荷互动
export let screenChhd = _ => axios.post('/screen/queryHCHD');
// 本年节支柱状图
export let screenJzLine = _ => axios.post('/screen/queryJZTJ');
// 平台类型
export let ptType = _ => axios.get('/common/getUserType');


// 工业-智慧电务 

export function gyTopApi(dataobj) {
  return request({
    url: '/index/wisdomEle/queryInfo',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: dataobj
  })
}
// 工业 折线 
export function gyLineApi(dataobj) {
  return request({
    url: '/index/wisdomEle/getDayChart',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: dataobj
  })
}

// 工业 柱状图 
export function gyBarApi(dataobj) {
  return request({
    url: '/index/wisdomEle/getMonthChart',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: dataobj
  })
}



