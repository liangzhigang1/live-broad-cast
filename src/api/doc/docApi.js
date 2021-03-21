import { _get, _post, _queryPage } from '../../utils/BaseApi'

/**
 * 关联文档到教室
 * @param {*} params 
 */
export const _bindDocApi = (params = {}) => _post({url: '/openapi/doc/bindDoc', params, token: true})

/**
 * 删除文档到教室
 * @param {*} params 
 */
 export const _deleteDocApi = (params = {}) => _post({url: '/openapi/doc/removeDoc', params, token: true})

// https://${private_domain}.at.baijiayun.com/openapi/doc/bindDoc