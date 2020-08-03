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
const Home =  resolve => require(['@/components/Home'],resolve)
const Login =  resolve => require(['@/components/Login'],resolve)
const Map =  resolve => require(['@/components/map'],resolve)
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
      redirect:'/home/map',
      children: [{
        path: "map",
        name: 'map',
        component: Map,
      },{
        path: "operationMonitor",
        name: 'operationMonitor',
        component: resolve => require(['@/components/opeMon/operationMonitor'],resolve),
        children: [{
          path: "cellAndAir",
          name: 'cellAndAir',
          component:  resolve => require(['@/components/opeMon/cellAndAir'],resolve),
        },{
          path: "loadAnalyze",
          name: 'loadAnalyze',
          component:  resolve => require(['@/components/opeMon/loadAnalyze'],resolve),
        }]
      },{
        path: "report",
        name: 'report',
        component: resolve => require(['@/components/report/report'],resolve),
      }]
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
    // let token = sessionStorage.getItem('token');
    // if (!token) {
    //   next('/login');
    //   return
    // }


    next();
  }
})

export default router
