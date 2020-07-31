import Vue from 'vue'
import App from './App'
import '@/assets/css/common.css'
import '@/assets/css/style.css'
import '@/assets/alibabaFont/iconfont.css'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store/index';
Vue.use(ElementUI);

Vue.config.productionTip = false
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
