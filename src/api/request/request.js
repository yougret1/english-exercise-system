/**
 * axios二次封装
 */
import axios from 'axios'
import storage from '../../store/storage'
import { Loading, Message } from 'element-ui'
import { devURL } from './requestConfig'
// 创建axios 实例对象,添加全局配置
const service = axios.create({
  timeout: 5000,
  baseURL: null
})

// 请求拦截

service.interceptors.request.use((req) => {
  const headers = req.headers
  // // let loadingInstance = Loading.service();
  const token1 = storage.getItem('token') || ''

  const userInfo = JSON.parse(window.localStorage.getItem('userInfo')) || {}
  // 获取 token 的值
  const token = userInfo.token || ''
  console.log(token)
  headers.token = token

  headers.Authorization = token
  // }
  return req
})
// 响应拦截
service.interceptors.response.use((res) => {
  const { code, data, msg } = res.data
  const loadingInstance = Loading.service()
  loadingInstance.close()
  if (code === 200) {
    if (res.config.method !== 'get') {
      Message.success({
        message: msg,
        duration: 1200
      })
    }
    return data
  } else {
    Message.error({
      message: msg,
      duration: 1200
    })
    return data
  }
}, error => {
  // console.log("detect ERROR")
  // console.log(error);
  const loadingInstance = Loading.service()
  loadingInstance.close()
  return error.response.data
})
const request = {}

// init->根据传参初始化修改config的配置(局部mock 和全局mock)并将配置好的service返回
request.init = function (option) {
  service.defaults.baseURL = devURL
  // console.log("本次的baseUrl", service.defaults.baseURL);
  return service
}
request.get = function (url, data, option) {
  return request.init(option).get(url)
}
request.post = function (url, data, option) {
  return request.init(option).post(url, data, option)
}
request.put = function (url, data, option) {
  return request.init(option).put(url, data, option)
}
request.delete = function (url, data, option) {
  return request.init(option).delete(url, {
    data,
    ...option
  })
}
request.getByPython = function (url, data, option) {
  return request.init(option).get(url, {
    params: data
  })
}
export default request
