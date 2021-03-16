import { _get, _post, _queryPage } from '../../utils/BaseApi'

/**
 * 添加接口
 * @param {*} params 
 */
export const _saveApi = (params = {}) => _post({url: '/openapi/doc/bindDoc', params, token: true})


// https://${private_domain}.at.baijiayun.com/openapi/doc/bindDoc