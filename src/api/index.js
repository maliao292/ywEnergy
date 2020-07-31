import axios from './config';
import qs from 'qs'

/**
 * 登录
 * @param {*} dataobj 
 */
export let login = dataobj => axios.post('/login',qs.stringify(dataobj));
// export let login = dataobj => axios.get('/hello');


