import request from '@/utils/request'

// 查询列表
export function listFucMan(query) {
  return request({
    url: '/system/funcManage/list',
    method: 'get',
    params: query
  })
}

// 查询详细
export function getFucMan(id) {
  return request({
    url: '/system/funcManage/' + id,
    method: 'get'
  })
}

// 新增
export function addFucMan(data) {
  return request({
    url: '/system/funcManage',
    method: 'post',
    data: data
  })
}

// 修改
export function updateFucMan(data) {
  return request({
    url: '/system/funcManage',
    method: 'put',
    data: data
  })
}

// 删除
export function delFucMan(id) {
  return request({
    url: '/system/funcManage/' + id,
    method: 'delete'
  })
}

// 全部启用、停用
export function ifAllStart(id) {
  return request({
    url: '/system/funcManage/updateStatus/' +id,
    method: 'get'
  })
}

// 批量策略绑定
export function fucBatch(data) {
  return request({
    url: '/system/funcManage/batch',
    method: 'post',
    data: data
  })
}
