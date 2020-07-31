let loadingInstance;
import axios from 'axios';
// 增加默认的请求的 url;
axios.defaults.timeout = 15000;
axios.defaults.baseURL = '/ywptapi';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; 


// http请求拦截器
axios.interceptors.request.use(config => {

  return config
}, error => {
  return Promise.reject(error)
})


// http响应拦截器
axios.interceptors.response.use(data => {// 响应成功关闭loading
  loadingInstance.close();
  return data
}, error => {
  loadingInstance.close();
  return 'err'
})

export default axios