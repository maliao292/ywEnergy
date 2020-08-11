import axios from './config';
import request from './config';
import qs from 'qs'

// 获取报表信息
export function getReportTable(data) {
  return request({
    url: '/reports/ep',
    method: 'get',
    params: {
      stationId: data.stationId,
      queryDate: data.queryDate,
    }
  })
}

// 获取报表信息
export function exportReport(data) {
  return request({
    url: '/reports/export',
    method: 'get',
    responseType:'blob',
    params: {
      stationId: data.stationId,
      queryDate: data.queryDate,
    }
  })
}
