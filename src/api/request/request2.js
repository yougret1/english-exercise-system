/**
 * axios二次封装
 */
import axios from 'axios'
import storage from '../../store/storage'
import { Loading } from 'element-ui'
import { pythonURL } from './requestConfig'
// 创建axios 实例对象,添加全局配置
const service = axios.create({
  timeout: 5000,
  baseURL: null,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type'
  }
})

// 请求拦截

service.interceptors.request.use((req) => {
  const headers = req.headers
  const token = storage.getItem('token') || ''
  headers.Authorization = token
  return req
})
// 响应拦截
service.interceptors.response.use((res) => {
  return res
}, error => {
  console.log('error:' + error)
  const loadingInstance = Loading.service()
  loadingInstance.close()
  return error.response.data
})

const request = {}

// init->根据传参初始化修改config的配置(局部mock 和全局mock)并将配置好的service返回
request.init = function (option) {
  service.defaults.baseURL = pythonURL
  return service
}
request.get = function (url, option) {
  return request.init(option).get(url)
}

export default request
