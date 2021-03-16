var fly = require("flyio")

class FlyRequest {

  get METHODS () {
    return {
      GET: 'get',
      POST: 'post',
      PUT: 'put',
      PATCH: 'patch',
      DELETE: 'delete',
      HEAD: 'head',
      OPTIONS: 'options',
      CONNECT: 'connect',
      TRACE: 'trace'
    }
  }
  /**
   * 构造函数
   * @param {*} config
   */
  constructor (config = {}) {
    Object.assign(
      fly.config,
      {
        method: 'GET',      // 请求方法， GET 、POST ...
        headers: {},        // 请求头
        baseURL: '',        // 请求基地址
        parseJson: true,    // 是否自动将Content-Type为“application/json”的响应数据转化为JSON对象，默认为true
        timeout: 1000 * 15  // 超时时间，默认15秒
      },
      config
    )
  }
  /**
   * 注册拦截器
   * @param String type           拦截器类型，取值：[request / response]
   * @param Function interceptor  拦截器
   * @param Function error        异常拦截器
   */
  registerInterceptor = (type, interceptor, error) => {
    if (interceptor && typeof interceptor === 'function') {
      fly.interceptors[type].use(interceptor, error)
    } else {
      throw new Error('注册失败，拦截器参数错误！')
    }
  }
  /**
   * 注册请求拦截器
   * @param Function interceptor  拦截器
   */
  registerRequestInterceptor = (interceptor) => this.registerInterceptor('request', interceptor)
  /**
   * 注册响应拦截器
   * @param Function interceptor        拦截器
   * @param Function error              异常拦截器
   */
  registerResponseInterceptor = (interceptor, error) => this.registerInterceptor('response', interceptor, error)
  /**
   * Get
   * RESTful - 读取（Read）
   * @param string url      请求的URL
   * @param any data        请求参数
   * @param json options    配置项
   */
  get = (url, data, options = {}) => fly.request(url, data, Object.assign(options, {method: this.METHODS.GET}))
  /**
   * Post
   * RESTful - 新建（Create）
   * @param string url      请求的URL
   * @param any data        请求参数
   * @param json options    配置项
   */
  post = (url, data, options = {}) => fly.request(url, data, Object.assign(options, {method: this.METHODS.POST}))
  /**
   * Put
   * RESTful - 更新（Update）
   * @param string url      请求的URL
   * @param any data        请求参数
   * @param json options    配置项
   */
  put = (url, data, options = {}) => fly.request(url, data, Object.assign(options, {method: this.METHODS.PUT}))
  /**
   * Patch
   * RESTful - 更新（Update），通常是部分更新
   * @param string url      请求的URL
   * @param any data        请求参数
   * @param json options    配置项
   */
  patch = (url, data, options = {}) => fly.request(url, data, Object.assign(options, {method: this.METHODS.PATCH}))
  /**
   * Delete
   * RESTful - 删除（Delete）
   * @param string url      请求的URL
   * @param any data        请求参数
   * @param json options    配置项
   */
  delete = (url, data, options = {}) => fly.request(url, data, Object.assign(options, {method: this.METHODS.DELETE}))
  /**
   * desc:
   * @param string url      请求的URL
   * @param any data        请求参数
   * @param json options    配置项
   */
  head = (url, data, options = {}) => fly.request(url, data, Object.assign(options, {method: this.METHODS.HEAD}))
  /**
   * desc:
   * @param string url      请求的URL
   * @param any data        请求参数
   * @param json options    配置项
   */
  options = (url, data, options = {}) => fly.request(url, data, Object.assign(options, {method: this.METHODS.OPTIONS}))
  /**
   * desc:
   * @param string url      请求的URL
   * @param any data        请求参数
   * @param json options    配置项
   */
  connect = (url, data, options = {}) => fly.request(url, data, Object.assign(options, {method: this.METHODS.CONNECT}))
  /**
   * desc:
   * @param string url      请求的URL
   * @param any data        请求参数
   * @param json options    配置项
   */
  trace = (url, data, options = {}) => fly.request(url, data, Object.assign(options, {method: this.METHODS.TRACE}))
}

export default FlyRequest