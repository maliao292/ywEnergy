import request from '@/utils/request'

// 查询列表
export function listAlarmSearch(query) {
  return request({
    url: '/alarm/AlarmInfoView/list',
    method: 'get',
    params: query
  })
}

// 告警确认
export function confirmAlarm(data) {
  return request({
    url: '/alarm/AlarmInfoView/confirm',
    method: 'post',
    data: data
  })
}

// 告警全部确认
export function confirmAlarm_all(data) {
  return request({
    url: '/alarm/AlarmInfoView/allConfirm',
    method: 'post',
    data: data
  })
}
