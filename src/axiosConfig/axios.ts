import { AxiosPromise, ResponseType } from 'axios'
import request from './request'

import config from './config'

const { defaultHeaders } = config

interface Config {
  params?: any
  data?: any
  url: string
  method: 'get' | 'post' | 'delete' | 'put'
  headersType?: string
  responseType?: ResponseType
}

function fetch({ url, method, params, data, headersType, responseType }: Config): AxiosPromise {
  return request({
    url,
    method,
    params,
    data,
    responseType,
    headers: {
      'Content-Type': headersType || defaultHeaders
    }
  })
}

export { fetch }
