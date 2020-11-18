import Vue from 'vue'
import Vuex from 'vuex'
import permission from './permission'
import { getRouters } from '@/api/menu'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        ywIdentity: '',
        ywUser: '',
        mapMarkerName:'',
    },
    getters: {
      getmenuRole(state) {
        return state.menuRole
      }
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('ywIdentity', token)
        },
        setUser(state, ywUser) {
            state.ywUser = ywUser;
            localStorage.setItem('ywUserName', ywUser)
        },
        clearInfo(state) {
            localStorage.removeItem('ywIdentity')
            localStorage.removeItem('ywUserName')
            localStorage.removeItem('menuList')
            state.ywIdentity = null;
            state.ywUser = null;
        },
      setmenuRole(state, msg) {
        state.menuRole = msg;
        localStorage.setItem('menuList',JSON.stringify(msg))
      }
    },
     actions: {

       async setmenuRoleList(context) {
       await getRouters().then(res => {
          // console.log(res);
          context.commit('setmenuRole',{list:res.data})
          return new Promise(function(resolve, reject){
            //做一些异步操作
            // console.log('执行完成');
            resolve('随便什么数据');
          });
        }).catch((err) => {
          context.commit('setmenuRole',{})
        });

      }
    },
  modules: {
    permission,
  },
})

export default store;
