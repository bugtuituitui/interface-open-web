import axios from 'axios'
import { Notify, MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import Qs from 'qs'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url

  withCredentials: true, // send cookies when cross-domain requests
  timeout: 600000, // request timeout
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  transformRequest: [function (data) {
    // 对 data 进行任意转换处理
    return Qs.stringify(data)
  }]
})

// request interceptor
service.interceptors.request.use(
  config => {

    if (store.getters.token) {
      config.headers["token"] = getToken()
    }

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // 10001: NOT LOGIN; 10002: NO AUTH;
    if (res.code === 10001 || res.code === 10002 || res.code === 50014) {
      // to re-login
      Message({
        message: res.message,
        type: 'error',
        duration: 3 * 1000
      })

      store.dispatch('user/resetToken').then(() => {
        location.reload()
      })

      return Promise.reject(new Error(res.message || "token invalid"))
    }

    return res
  },
  error => {
    // console.log('err' + error) // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    // Notify({
    //   title: '操作失败',
    //   message: error.message,
    //   type: 'error'
    // });
    return Promise.reject(error)
  }
)

export default service
