export default {
    // 用户管理
    path: "sideDemand",
    name: 'system',
    redirect: '/home/sideDemand/sign',
    component: resolve => require(['@/components/sideDemand'], resolve),
    children: [{
        path: "sign",
        name: 'sign',
        component: resolve => require(['@/components/sideDemand/sign'], resolve),
    }, {
        path: "target",
        name: 'target',
        component: resolve => require(['@/components/sideDemand/target'], resolve),
    }, {
        path: "response",
        name: 'response',
        component: resolve => require(['@/components/sideDemand/response'], resolve),
    }]

}