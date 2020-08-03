import Vue from 'vue'
import App from './App'
import '@/assets/css/common.css'
import '@/assets/css/style.css'
import '@/assets/css/style_zl.css'
import '@/assets/alibabaFont/iconfont.css'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store/index';
import VueAMap from 'vue-amap';
Vue.use(ElementUI);
Vue.use(VueAMap);

VueAMap.initAMapApiLoader({
  key: '	6749e07e6a17a94ea7bc2a164f9202dd',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});
Vue.config.productionTip = false
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
