import request from '@/utils/request'
export function getApiList(data) {
    return request({
        url: '/api/list',
        method: 'post',
        data
    })
}

export function updateApi(data) {
    return request({
        url: '/api/update',
        method: 'post',
        data
    })
}


export function deleteApi(data) {
    return request({
        url: '/api/delete',
        method: 'post',
        data
    })
}


export function insertApi(data) {
    return request({
        url: '/api/insert',
        method: 'post',
        data
    })
}

export function invokeTest(data) {
    return request({
        url: '/apiTest/execute',
        method: 'post',
        data
    })
}