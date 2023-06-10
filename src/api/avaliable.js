import request from '@/utils/request'
export function getAvaliableList(data) {
    return request({
        url: '/avaliable/list',
        method: 'post',
        data
    })
}

export function updateAvaliable(data) {
    return request({
        url: '/avaliable/update',
        method: 'post',
        data
    })
}


export function deleteAvaliable(data) {
    return request({
        url: '/avaliable/delete',
        method: 'post',
        data
    })
}


export function insertAvaliable(data) {
    return request({
        url: '/avaliable/insert',
        method: 'post',
        data
    })
}