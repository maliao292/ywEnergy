import request from '@/utils/request'

// 查询用户档案列表
export function listStation(query) {
  return request({
    url: '/user/Station/list',
    method: 'get',
    params: query
  })
}

// 查询用户档案详细
export function getStation(id) {
  return request({
    url: '/user/Station/' + id,
    method: 'get'
  })
}

// 新增用户档案
export function addStation(data) {
  return request({
    url: '/user/Station',
    method: 'post',
    data: data
  })
}

// 修改用户档案
export function updateStation(data) {
  return request({
    url: '/user/Station',
    method: 'put',
    data: data
  })
}

// 删除用户档案
export function delStation(id) {
  return request({
    url: '/user/Station/' + id,
    method: 'delete'
  })
}

// 导出用户档案
export function exportStation(query) {
  return request({
    url: '/user/Station/export',
    method: 'get',
    params: query
  })
}

// 回路层级
export function getLoopData(id) {
  return request({
    url: '/user/Station/loop',
    method: 'get'
  })
}
