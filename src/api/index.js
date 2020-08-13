import axios from './config';
import qs from 'qs'

/**
 * 登录
 * @param {*} dataobj 
 */
export let login = dataobj => axios.post('/login',qs.stringify(dataobj));
// export let logout = dataobj => axios.post('/logout',qs.stringify(dataobj));
// 地图树
export let mapTree = dataobj => axios.post('/index/queryTree',qs.stringify(dataobj));
// 地图 marker
export let mapMarker = dataobj => axios.post('/index/queryView',qs.stringify(dataobj));

//信息统计TOP 
export let topNum = _ => axios.post('/index/queryTop');

// 站点详情
export let stationDetailApi = dataobj => axios.post('/index/queryInfo',qs.stringify(dataobj));
// 地图详情折线图GET /analysis/jzfh
export let mapLineData = dataobj => axios.get('/analysis/jzfh?stationId='+dataobj.stationId+'&queryDate='+dataobj.queryDate);