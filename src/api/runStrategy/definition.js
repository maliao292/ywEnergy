import request from '@/utils/request'

// 查询列表
export function listConfig(query) {
  return request({
    url: '/system/funcConfig/list',
    method: 'get',
    params: query
  })
}

// 查询详细
export function getStrategy(id) {
  return request({
    url: '/system/funcConfig/' + id,
    method: 'get'
  })
}

// 新增
export function addStrategy(data) {
  return request({
    url: '/system/funcConfig',
    method: 'post',
    data: data
  })
}

// 修改
export function updateStrategy(data) {
  return request({
    url: '/system/funcConfig',
    method: 'put',
    data: data
  })
}

// 删除
export function delStrategy(id) {
  return request({
    url: '/system/funcConfig/' + id,
    method: 'delete'
  })
}

