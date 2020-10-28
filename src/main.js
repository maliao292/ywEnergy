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
Vue.use(ElementUI);
import myCharts from './chartMethod'
Vue.use(myCharts)
import publicMethods from './chartMethod/publicMethods'
Vue.use(publicMethods)
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import { getDicts } from "@/api/system/dict/data";
import { parseTime, resetForm, addDateRange, selectDictLabel, selectDictLabels, download, handleTree } from "@/utils/ruoyi";
import Pagination from "@/components/Pagination";

// 全局挂载方法
Vue.prototype.getDicts = getDicts
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.parseTime = parseTime
Vue.prototype.handleTree = handleTree

Vue.prototype.msgSuccess = function (msg) {
  this.$message({ showClose: true, message: msg, type: "success" });
}

Vue.prototype.msgError = function (msg) {
  this.$message({ showClose: true, message: msg, type: "error" });
}

Vue.prototype.msgInfo = function (msg) {
  this.$message.info(msg);
}

// 全局组件挂载
Vue.component('Pagination', Pagination)

Vue.config.productionTip = false
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
