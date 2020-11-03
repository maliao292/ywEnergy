import request from '@/utils/request'

// 查询列表
export function listConfig_det(query) {
  return request({
    url: '/system/funcConfigDetail/list',
    method: 'get',
    params: query
  })
}

// 查询详细
export function getStrategy_det(id) {
  return request({
    url: '/system/funcConfigDetail/' + id,
    method: 'get'
  })
}

// 新增
export function addStrategy_det(data) {
  return request({
    url: '/system/funcConfigDetail',
    method: 'post',
    data: data
  })
}

// 修改
export function updateStrategy_det(data) {
  return request({
    url: '/system/funcConfigDetail',
    method: 'put',
    data: data
  })
}

// 删除
export function delStrategy_det(id) {
  return request({
    url: '/system/funcConfigDetail/' + id,
    method: 'delete'
  })
}

// 获取动作下拉
export function getDetailAction(query) {
  return request({
    url: '/system/funcConfigDetail/actionList',
    method: 'get',
    params: query
  })
}
