import request from '@/utils/request'
export function getInvokeList(data) {
    return request({
        url: '/invoke/list',
        method: 'post',
        data
    })
}

export function updateInvoke(data) {
    return request({
        url: '/invoke/update',
        method: 'post',
        data
    })
}


export function deleteInvoke(data) {
    return request({
        url: '/invoke/delete',
        method: 'post',
        data
    })
}


export function insertInvoke(data) {
    return request({
        url: '/invoke/insert',
        method: 'post',
        data
    })
}