"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App"));

require("@/assets/css/common.css");

require("@/assets/css/style.css");

require("@/assets/css/style_zl.css");

require("@/assets/alibabaFont/iconfont.css");

var _router = _interopRequireDefault(require("./router"));

var _elementUi = _interopRequireDefault(require("element-ui"));

require("element-ui/lib/theme-chalk/index.css");

var _index2 = _interopRequireDefault(require("./store/index"));

var _chartMethod = _interopRequireDefault(require("./chartMethod"));

var _publicMethods = _interopRequireDefault(require("./chartMethod/publicMethods"));

var _echarts = _interopRequireDefault(require("echarts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_elementUi["default"]);

_vue["default"].use(_chartMethod["default"]);

_vue["default"].use(_publicMethods["default"]); // 引入echarts


_vue["default"].prototype.$echarts = _echarts["default"];
_vue["default"].config.productionTip = false;
new _vue["default"]({
  el: '#app',
  store: _index2["default"],
  router: _router["default"],
  components: {
    App: _App["default"]
  },
  template: '<App/>'
});