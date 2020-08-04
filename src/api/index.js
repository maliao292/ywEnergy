import axios from './config';
import qs from 'qs'

/**
 * 登录
 * @param {*} dataobj 
 */
export let login = dataobj => axios.post('/login',qs.stringify(dataobj));
export let logout = dataobj => axios.post('/logout',qs.stringify(dataobj));
// 地图树
export let mapTree = dataobj => axios.post('/index/queryTree',qs.stringify(dataobj));
// 地图 marker
export let mapMarker = dataobj => axios.post('/index/queryView',qs.stringify(dataobj));

