/**
 * request全局配置
 */
import { ConfigOptions } from './types'

const config: ConfigOptions = {
  /**
   * api请求基础路径
   */
  baseUrl: {
    // 开发环境接口前缀
    // dev: 'https://api.apiopen.top',
    dev: 'http://mockjs.test.cn',
    // 生产环境接口前缀
    pro: 'http://mockjs.test.cn',
    // 测试环境接口前缀
    test: 'http://mockjs.test.cn'
  },

  /**
   * 接口成功返回状态码
   */
  resultCode: '0000',

  /**
   * 接口请求超时时间
   */
  requestTimeout: 5000,

  /**
   * 默认接口请求类型
   * 可选值：application/x-www-form-urlencoded multipart/form-data
   */
  defaultHeaders: 'application/json'
}

export default config
