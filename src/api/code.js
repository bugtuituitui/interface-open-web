import request from '@/utils/request'

// 验证码接口

export function getCode(params) {
    return request({
        url: '/imgCode/generate',
        method: 'get',
        params
    })
}

export function validateCode(data) {
    return request({
        url: '/imgCode/validate',
        method: 'post',
        data
    })
}