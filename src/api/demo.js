import request from '@/utils/request'

export function testPost(data) {
    return request({
        url: '/api/test/post',
        method: 'post',
        data
    })
}

export function testGet(params) {
    return request({
        url: '/api/test/get',
        method: 'post',
        params
    })
}