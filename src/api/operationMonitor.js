import axios from './config';
import request from './config';
import qs from 'qs'

// 获取街道信息
export function getStreetInfo(data) {
  return request({
    url: '/common/queryStreet',
    method: 'get',
  })
}

// 获取站点信息
export function getStationInfo(data) {
  return request({
    url: '/common/queryStation',
    method: 'get',
    params:{
      streetId:data
    }
  })
}

// 电池充放电
export function getDccfd(data) {
  return request({
    url: '/analysis/dccfdgv',
    method: 'get',
    params: {
      stationId: data.stationId,
      queryDate: data.queryDate,
    }
  })
}

// 温度与空调
export function getWdkt(data) {
  return request({
    url: '/analysis/wdykkgv',
    method: 'get',
    params: {
      stationId: data.stationId,
      queryDate: data.queryDate,
    }
  })
}

// 基站用电分析
export function getJzydfx(data) {
  return request({
    url: '/analysis/jzydfx',
    method: 'get',
    params: {
      stationId: data.stationId,
      queryDate: data.queryDate,
    }
  })
}

// 分时用电分析
export function getFSydfx(data) {
  return request({
    url: '/analysis/fsydfx',
    method: 'get',
    params: {
      stationId: data.stationId,
      queryDate: data.queryDate,
    }
  })
}

// 基站负荷
export function getJzfh(data) {
  return request({
    url: '/analysis/jzfh',
    method: 'get',
    params: {
      stationId: data.stationId,
      queryDate: data.queryDate,
    }
  })
}
