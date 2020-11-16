import request from './config';
import qs from 'qs'

// 设备
export const deviceList = params => request.get('/common/queryDeviceList', { params })
    // 基站
export const staList = () => request.get('/common/queryStaList')
    // 签约管理
export const signList = params => request.get('/side/getList', { params })
export const signSaveOrEdit = (dataobj) => {
    return request({
        url: '/side/saveOrEdit',
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        params: dataobj
    })
}

export const delSign = (dataobj) => {
    return request({
        url: '/side/del',
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        params: dataobj
    })
}

// 指标管理
export const targetList = params => request.get('/target/getList', { params })

// 新增 修改 下发
export const targetSaveOrEdit = (dataobj) => {
    return request({
        url: '/target/saveOrEdit',
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        params: dataobj
    })
}
export const delTarget = (dataobj) => {
    return request({
        url: '/target/del',
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        params: dataobj
    })
}

// 响应评估 fjList
export const responsetList = params => request.get('/settle/getList', { params })

// 待分解 列表
export const fjList = params => request.get('/target/decomposeShow', { params })
    // 分解后 保存
export const fjSave = params => request.get('/target/decompose', { params })
    // 下发
export const xfTarget = params => request.get('/target/decompose', { params })