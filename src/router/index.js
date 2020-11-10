import Vue from "vue";
import Router from "vue-router";

/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

// import Home from "@/components/Home";
// import Login from "@/components/Login";
const Home = resolve => require(['@/components/Home'], resolve)
const Login = resolve => require(['@/components/Login'], resolve)
const Map = resolve => require(['@/components/map'], resolve)
const Screen = resolve => require(['@/components/screen'], resolve)
Vue.use(Router);
let router = new Router({
  linkActiveClass: "active",
  mode: 'history',
  routes: [
    {
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
        component: Map,
      }, {
        path: "/home/operationMonitor",
        name: 'operationMonitor',
        redirect: '/home/operationMonitor/cellAndAir',
        component: resolve => require(['@/components/opeMon/operationMonitor'], resolve),
        children: [{
          path: "cellAndAir",
          name: 'cellAndAir',
          component: resolve => require(['@/components/opeMon/cellAndAir'], resolve),
        }, {
          path: "loadAnalyze",
          name: 'loadAnalyze',
          component: resolve => require(['@/components/opeMon/loadAnalyze'], resolve),
        }]
      },
        {
          // 报表
          path: "/home/report",
          name: 'report',
          redirect: '/home/report/reportTable',
          component: resolve => require(['@/components/report/report'], resolve),
          children: [{
            path: "reportTable",
            name: 'reportTable',
            component: resolve => require(['@/components/report/reportTable'], resolve),
          },{
            path: "glAndTemTable",
            name: 'glAndTemTable',
            component: resolve => require(['@/components/report/glAndTemTable'], resolve),
          }
          ]
        },
        {
          // 运行策略管理
          path: "/home/runStrategy",
          name: 'runStrategy',
          redirect: '/home/runStrategy/definition',
          component: resolve => require(['@/components/runStrategy/index'], resolve),
          children: [{
            path: "definition",
            name: 'definition',
            component: resolve => require(['@/components/runStrategy/definition'], resolve),
          },{
            path: "runManage",
            name: 'runManage',
            component: resolve => require(['@/components/runStrategy/runManage'], resolve),
          }
          ]
        },
        {
          // 设备管理
          path: "/home/standing",
          name: 'standing',
          redirect: '/home/standing/subscriber',
          component: resolve => require(['@/components/standing/index'], resolve),
          children: [{
            path: "subscriber",
            name: 'subscriber',
            component: resolve => require(['@/components/standing/subscriber'], resolve),
          },{
            path: "collect",
            name: 'collect',
            component: resolve => require(['@/components/standing/collect'], resolve),
          },
          ]
        },
        {
          // 报警管理
          path: "/home/alarm",
          name: 'alarm',
          redirect: '/home/alarm/alarmSearch',
          component: resolve => require(['@/components/alarm/index'], resolve),
          children: [{
            path: "alarmSearch",
            name: 'alarmSearch',
            component: resolve => require(['@/components/alarm/alarmSearch'], resolve),
          },{
            path: "alarmConfiguration",
            name: 'alarmConfiguration',
            component: resolve => require(['@/components/alarm/alarmConfiguration'], resolve),
          },
          ]
        },
        {
          // 系统管理
          path: "/home/system",
          name: 'system',
          redirect: '/home/system/user',
          component: resolve => require(['@/components/system/index'], resolve),
          children: [{
            path: "user",
            name: 'user',
            component: resolve => require(['@/components/system/user/index'], resolve),
          },{
            path: "role",
            name: 'role',
            component: resolve => require(['@/components/system/role/index'], resolve),
          },{
            path: "menu",
            name: 'menu',
            component: resolve => require(['@/components/system/menu/index'], resolve),
          },{
            path: "dict",
            name: 'dict',
            component: resolve => require(['@/components/system/dict/index'], resolve),

          },{
            path: 'type/data/:dictId(\\d+)',
            component: (resolve) => require(['@/components/system/dict/data'], resolve),
            name: 'Data',
          }
          ]
        },
        {
          // 用户管理
          path: "/home/user",
          name: 'system',
          redirect: '/home/user/station',
          component: resolve => require(['@/components/user/index'], resolve),
          children: [{
            path: "station",
            name: 'station',
            component: resolve => require(['@/components/user/station/index'], resolve),
          }]
        },

      ]
    },

    {
      path: "/screen",
      name: "screen",
      component: Screen
    },
    {
      path: '/',
      redirect: { name: 'home' },
    }
    , {
      path: '*',
      redirect: { name: 'login' },
    },
  ]
});
// 注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('ywIdentity');
    let userName = localStorage.getItem('ywUserName');
    if (!token||!userName) {
      next('/login');
      return
    }
    next();
  }
})

export default router
