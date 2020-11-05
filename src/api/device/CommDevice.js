import request from '@/utils/request'

// 查询用户设备管理列表
export function listCommDevice(query) {
  return request({
    url: '/device/CommDevice/list',
    method: 'get',
    params: query
  })
}

// 查询用户设备管理详细
export function getCommDevice(id) {
  return request({
    url: '/device/CommDevice/' + id,
    method: 'get'
  })
}

// 新增用户设备管理
export function addCommDevice(data) {
  return request({
    url: '/device/CommDevice',
    method: 'post',
    data: data
  })
}

// 修改用户设备管理
export function updateCommDevice(data) {
  return request({
    url: '/device/CommDevice',
    method: 'put',
    data: data
  })
}

// 删除用户设备管理
export function delCommDevice(id) {
  return request({
    url: '/device/CommDevice/' + id,
    method: 'delete'
  })
}

// 导出用户设备管理
export function exportCommDevice(query) {
  return request({
    url: '/device/CommDevice/export',
    method: 'get',
    params: query
  })
}


// 获取采控终端
export function getCaikong(query) {
  return request({
    url: '/device/CommDevice/jianCeDianList',
    method: 'get',
    params: query
  })
}
