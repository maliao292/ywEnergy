import request from '@/utils/request'

// 查询无功站点信息
export function noPowerInfo(data) {
  return request({
    url: '/index/noPower/queryInfo',
    method: 'post',
    data: data
  })
}

// 查询功率信息
export function gonglvInfo(data) {
  return request({
    url: '/index/noPower/getInfo',
    method: 'post',
    data: data
  })
}

// 查询无功-日功率
export function noPower_dayChart(data) {
  return request({
    url: '/index/noPower/getDayChart',
    method: 'post',
    params: data
  })
}

// 无功控制下发
export function controlEq(data) {
  return request({
    url: '/switch/eq',
    method: 'get',
    params: data
  })
}
