import FlyRequest from './FlyRequest'
import Enums from './Enums'
import Qs from 'qs'
// import config from '@/config'
import { getToken } from './auth'
import { MessageBox, Message } from 'element-ui'


// const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
/**
 * HTTP请求对象
 */
const flyRequest = new FlyRequest({
  baseURL: 'https://tiansujing.at.baijiayun.com'
})

/**
 * 注册请求拦截器
 */
flyRequest.registerRequestInterceptor(request => {
  // 根据_mock参数，从环境变量中获取BASE_API或MOCK_BASE_API
  request.baseURL = request._mock ? process.env.MOCK_BASE_API : baseUrl
  const token = getToken()
  if (token) {
    request.headers['Authorization'] = 'Bearer ' + token
  }
  console.warn('####### API Request: ', request)
  // 可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
  return request
})

/**
 * 注册响应拦截器
 */
flyRequest.registerResponseInterceptor(
  response => {
    const res = response.data
    // 如果自定义代码不是0，则判断为错误。
    if (res.code !== 0 && res.code !== 10001) {
      Message({
        message: res.message || 'error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(res.message || 'error')
    } else {
      return res
    }
  },
  error => {
    // 请求失败调用
    if (error && error.response && error.response.status) {
      // 请求错误提示
      Message({
        message: error.message,
        type: "error",
        showClose: true,
        duration: 1000 * 1.5 * 3
      });
    }
    return Promise.reject(error);
  }
)

/**
 * ajax请求
 * @param {*}
 */
export function _request ({
  url,
  params = {},
  method = flyRequest.METHODS.POST,
  token = false,
  mock = false,
  contentType = Enums.ContentType.JSON_UTF8,
  headers = {}
} = {}) {
  headers['Content-Type'] = contentType
  return flyRequest[method](url, contentType == Enums.ContentType.FORM_UTF8 ? Qs.stringify(params) : params, {
    method: method,
    _token: token,
    _mock: mock,
    headers
  })
}

/**
 * GET请求
 * @param {*}
 */
export function _get ({
  url,
  params = {},
  method = flyRequest.METHODS.GET,
  token = false,
  mock = false,
  contentType = Enums.ContentType.JSON_UTF8,
  headers = {}
} = {}) {
  return _request({url, params, method, token, mock, contentType, headers})
}

/**
 * POST请求
 * @param {*}
 */
export function _post ({
  url,
  params = {},
  method = flyRequest.METHODS.POST,
  token = false,
  mock = false,
  contentType = Enums.ContentType.FORM_UTF8,
  headers = {}
} = {}) {
  return _request({url, params, method, token, mock, contentType, headers})
}

/**
 * 分页查询
 * @param {*}
 */
export function _queryPage ({
  url,
  params = {},
  method = flyRequest.METHODS.GET,
  token = false,
  mock = false,
  contentType = Enums.ContentType.JSON_UTF8
} = {}) {
  return _post({
    url,
    params,
    method,
    token,
    mock,
    contentType,
  })
}

/**
 * 流式分页查询
 * @param {*}
 */
export function _queryFlowPage ({
  url,
  params = {},
  method = flyRequest.METHODS.POST,
  token = false,
  mock = false,
  contentType = Enums.ContentType.JSON_UTF8
} = {}) {
  return _post({
    url,
    params,
    method,
    token,
    mock,
    contentType,
  })
}