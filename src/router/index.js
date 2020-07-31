import Vue from "vue";
import Router from "vue-router";

/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

import Mainer from "@/components/Mainer";
import Login from "@/components/Login";


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
      path: "/mainer",
      name: 'mainer',
      component: Mainer,
    },
    {
      path: '/',
      redirect: { name: 'mainer' },
    }
    , {
      path: '*',
      redirect: { name: 'mainer' },
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