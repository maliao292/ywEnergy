import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        ywIdentity: '',
        ywUser: '',
    },
    getters: {

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
            state.ywIdentity = null;
            state.ywUser = null;
        },
    },
    actions: {

    }
})

export default store;