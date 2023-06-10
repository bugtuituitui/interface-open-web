import request from '@/utils/request'
export function getCertList(data) {
    return request({
        url: '/cert/list',
        method: 'post',
        data
    })
}

export function updateCert(data) {
    return request({
        url: '/cert/update',
        method: 'post',
        data
    })
}


export function deleteCert(data) {
    return request({
        url: '/cert/delete',
        method: 'post',
        data
    })
}


export function insertCert(data) {
    return request({
        url: '/cert/insert',
        method: 'post',
        data
    })
}

export function getCert(data) {
    return request({
        url: '/cert/get',
        method: 'post',
        data
    })
}

export function generateCert(data) {
    return request({
        url: '/cert/generate',
        method: 'post',
        data
    })
}