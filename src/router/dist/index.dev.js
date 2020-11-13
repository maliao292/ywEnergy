"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _sideDemand = _interopRequireDefault(require("./sideDemand"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 重写路由的push方法
 */
var routerPush = _vueRouter["default"].prototype.push;

_vueRouter["default"].prototype.push = function push(location) {
  return routerPush.call(this, location)["catch"](function (error) {
    return error;
  });
}; // import Home from "@/components/Home";
// import Login from "@/components/Login";


var Home = function Home(resolve) {
  return require(['@/components/Home'], resolve);
};

var Login = function Login(resolve) {
  return require(['@/components/Login'], resolve);
};

var Map = function Map(resolve) {
  return require(['@/components/map'], resolve);
};

var Screen = function Screen(resolve) {
  return require(['@/components/screen'], resolve);
};

_vue["default"].use(_vueRouter["default"]);

var router = new _vueRouter["default"]({
  linkActiveClass: "active",
  mode: 'history',
  routes: [{
    path: "/login",
    name: "login",
    component: Login
  }, {
    path: "/home",
    name: 'home',
    component: Home,
    redirect: '/home/map',
    children: [{
      path: "map",
      name: 'map',
      component: Map
    }, {
      path: "/home/operationMonitor",
      name: 'operationMonitor',
      redirect: '/home/operationMonitor/cellAndAir',
      component: function component(resolve) {
        return require(['@/components/opeMon/operationMonitor'], resolve);
      },
      children: [{
        path: "cellAndAir",
        name: 'cellAndAir',
        component: function component(resolve) {
          return require(['@/components/opeMon/cellAndAir'], resolve);
        }
      }, {
        path: "loadAnalyze",
        name: 'loadAnalyze',
        component: function component(resolve) {
          return require(['@/components/opeMon/loadAnalyze'], resolve);
        }
      }]
    }, {
      // 报表
      path: "/home/report",
      name: 'report',
      redirect: '/home/report/reportTable',
      component: function component(resolve) {
        return require(['@/components/report/report'], resolve);
      },
      children: [{
        path: "reportTable",
        name: 'reportTable',
        component: function component(resolve) {
          return require(['@/components/report/reportTable'], resolve);
        }
      }, {
        path: "glAndTemTable",
        name: 'glAndTemTable',
        component: function component(resolve) {
          return require(['@/components/report/glAndTemTable'], resolve);
        }
      }]
    }, {
      // 运行策略管理
      path: "/home/runStrategy",
      name: 'runStrategy',
      redirect: '/home/runStrategy/definition',
      component: function component(resolve) {
        return require(['@/components/runStrategy/index'], resolve);
      },
      children: [{
        path: "definition",
        name: 'definition',
        component: function component(resolve) {
          return require(['@/components/runStrategy/definition'], resolve);
        }
      }, {
        path: "runManage",
        name: 'runManage',
        component: function component(resolve) {
          return require(['@/components/runStrategy/runManage'], resolve);
        }
      }]
    }, {
      // 设备管理
      path: "/home/standing",
      name: 'standing',
      redirect: '/home/standing/subscriber',
      component: function component(resolve) {
        return require(['@/components/standing/index'], resolve);
      },
      children: [{
        path: "subscriber",
        name: 'subscriber',
        component: function component(resolve) {
          return require(['@/components/standing/subscriber'], resolve);
        }
      }, {
        path: "collect",
        name: 'collect',
        component: function component(resolve) {
          return require(['@/components/standing/collect'], resolve);
        }
      }]
    }, {
      // 报警管理
      path: "/home/alarm",
      name: 'alarm',
      redirect: '/home/alarm/alarmSearch',
      component: function component(resolve) {
        return require(['@/components/alarm/index'], resolve);
      },
      children: [{
        path: "alarmSearch",
        name: 'alarmSearch',
        component: function component(resolve) {
          return require(['@/components/alarm/alarmSearch'], resolve);
        }
      }, {
        path: "alarmConfiguration",
        name: 'alarmConfiguration',
        component: function component(resolve) {
          return require(['@/components/alarm/alarmConfiguration'], resolve);
        }
      }]
    }, {
      // 系统管理
      path: "/home/system",
      name: 'system',
      redirect: '/home/system/user',
      component: function component(resolve) {
        return require(['@/components/system/index'], resolve);
      },
      children: [{
        path: "user",
        name: 'user',
        component: function component(resolve) {
          return require(['@/components/system/user/index'], resolve);
        }
      }, {
        path: "role",
        name: 'role',
        component: function component(resolve) {
          return require(['@/components/system/role/index'], resolve);
        }
      }, {
        path: "menu",
        name: 'menu',
        component: function component(resolve) {
          return require(['@/components/system/menu/index'], resolve);
        }
      }, {
        path: "dict",
        name: 'dict',
        component: function component(resolve) {
          return require(['@/components/system/dict/index'], resolve);
        }
      }, {
        path: 'type/data/:dictId(\\d+)',
        component: function component(resolve) {
          return require(['@/components/system/dict/data'], resolve);
        },
        name: 'Data'
      }]
    }, {
      // 用户管理
      path: "/home/user",
      name: 'system',
      redirect: '/home/user/station',
      component: function component(resolve) {
        return require(['@/components/user/index'], resolve);
      },
      children: [{
        path: "station",
        name: 'station',
        component: function component(resolve) {
          return require(['@/components/user/station/index'], resolve);
        }
      }]
    }, _sideDemand["default"]]
  }, {
    path: "/screen",
    name: "screen",
    component: Screen
  }, {
    path: '/',
    redirect: {
      name: 'home'
    }
  }, {
    path: '*',
    redirect: {
      name: 'login'
    }
  }]
}); // 注册全局钩子用来拦截导航

router.beforeEach(function (to, from, next) {
  if (to.path === '/login') {
    next();
  } else {
    var token = localStorage.getItem('ywIdentity');
    var userName = localStorage.getItem('ywUserName');

    if (!token || !userName) {
      next('/login');
      return;
    }

    next();
  }
});
var _default = router;
exports["default"] = _default;