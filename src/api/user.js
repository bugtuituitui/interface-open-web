import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/user/getInfo',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}


export function getUserList(data) {
  return request({
    url: '/user/list',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}


export function deleteUser(data) {
  return request({
    url: '/user/delete',
    method: 'post',
    data
  })
}


export function insertUser(data) {
  return request({
    url: '/user/insert',
    method: 'post',
    data
  })
}