const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {
    constructor(level) {
        this.level = level || 1
        Auth.USER = 8
        Auth.ADMIN = 16
        Auth.SUPER_ADMIN = 32
    }

    get m() {
        // 添加中间件 检查token  HttpBasicAuth方式
        return async (ctx, next) => {
            const userToken = basicAuth(ctx.req)
            let errMsg = 'token不合法'
            if (!userToken || !userToken.name) {
                throw new global.errs.Forbbiden(errMsg)
            }
            let decode
            try {
                //使用var 解决域的范围
                decode = jwt.verify(userToken.name, global.config.security.secretKey)
            } catch (e) {
                if (e.name == 'TokenExpiredError') {
                    errMsg = 'token已过期'
                }
                throw new global.errs.Forbbiden(errMsg)
            }
            if (decode.scope < this.level) {
                throw new global.errs.Forbbiden("权限不足")
            }
            ctx.auth = {
                uid: decode.uid,
                scope: decode.scope
            }
            //移交,加await
            await next()
        }
    }
}

module.exports = {
    Auth
}