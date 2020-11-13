"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  // 用户管理
  path: "sideDemand",
  name: 'system',
  redirect: '/home/sideDemand/sign',
  component: function component(resolve) {
    return require(['@/components/sideDemand'], resolve);
  },
  children: [{
    path: "sign",
    name: 'sign',
    component: function component(resolve) {
      return require(['@/components/sideDemand/sign'], resolve);
    }
  }, {
    path: "target",
    name: 'target',
    component: function component(resolve) {
      return require(['@/components/sideDemand/target'], resolve);
    }
  }, {
    path: "response",
    name: 'response',
    component: function component(resolve) {
      return require(['@/components/sideDemand/response'], resolve);
    }
  }]
};
exports["default"] = _default;