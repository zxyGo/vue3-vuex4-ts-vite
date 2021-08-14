import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

import { Message } from '_c/Message'

import qs from 'qs'

import config from './config'

const { resultCode, baseUrl } = config

export const PATH_URL: string = baseUrl[import.meta.env.VUE_APP_CURRENTENV as string]

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: PATH_URL, // api 的 base_url
  timeout: config.requestTimeout // 请求超时时间
})

service.interceptors.request.use(
  (configs: AxiosRequestConfig) => {
    const configCopy: AxiosRequestConfig = configs
    if (
      configCopy.method === 'post' &&
      configCopy.headers['Content-Type'] === 'application/x-www-form-urlencoded'
    ) {
      configCopy.data = qs.stringify(configCopy.data)
    }
    return configCopy
  },
  (error: AxiosError) => {
    // Do something with request error
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.code === resultCode) {
      return response.data
    }
    Message.error(response.data.message)
    return true
  },
  (error: AxiosError) => {
    Message.error(error.message)
    return Promise.reject(error)
  }
)

export default service
