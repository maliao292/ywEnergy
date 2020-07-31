import axios from './config';
// import qs from 'qs'

/**
 * 登录
 * @param {*} dataobj 
 */
export let login = dataobj => axios.post('/login',dataobj);
