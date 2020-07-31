import axios from './config';

/** 合同容量 用户地址 */
export let rlDzData = dataobj => axios.post('/index.php?r=/index/htrl', dataobj);
