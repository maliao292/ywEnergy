import request from '@/utils/request'

// 查询采集设备管理列表
export function listIotDevice(query) {
  return request({
    url: '/device/iotDevice/list',
    method: 'get',
    params: query
  })
}

// 查询采集设备管理详细
export function getIotDevice(id) {
  return request({
    url: '/device/iotDevice/' + id,
    method: 'get'
  })
}

// 新增采集设备管理
export function addIotDevice(data) {
  return request({
    url: '/device/iotDevice',
    method: 'post',
    data: data
  })
}

// 修改采集设备管理
export function updateIotDevice(data) {
  return request({
    url: '/device/iotDevice',
    method: 'put',
    data: data
  })
}

// 删除采集设备管理
export function delIotDevice(id) {
  return request({
    url: '/device/iotDevice/' + id,
    method: 'delete'
  })
}

// 导出采集设备管理
export function exportIotDevice(query) {
  return request({
    url: '/device/iotDevice/export',
    method: 'get',
    params: query
  })
}