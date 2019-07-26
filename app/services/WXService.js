const util = require('util')
const axios = require('axios')
const {appId, appSecret, loginUrl} = require('../../config/config').wx
const User = require('../models/User')
const {generateToken} = require('../../core/util')
const {Auth} = require('../../middlewares/auth')

class WXService {
    /**
     * 检查并返回token
     * @param code
     * @returns {Promise<*>}
     */
    static async checkToToken(code) {
        const url = util.format(loginUrl, appId, appSecret, code)
        const result = await axios.get(url)
        if (result.status !== 200) {
            throw new global.errs.AuthFailed('获取openid失败')
        }
        if (result.data.errcode) {
            throw new global.errs.AuthFailed('获取openid失败:' + result.data.errMsg)
        }
        const openid = result.data.openid
        console.log(openid)
        let user = await User.getUserByOpenId(openid)
        if (!user) {
            user = await User.registerUserByOpenId(openid)
        }
        //Auth.USER权限
        return generateToken(user.id,Auth.USER)
    }
}

module.exports = {
    WXManager: WXService
}