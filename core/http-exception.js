class HttpException extends Error {
    constructor(msg = '服务器异常', code = 10000, status = 400) {
        super()
        this.code = code
        this.status = status
        this.msg = msg
    }
}

class Success extends HttpException {
    constructor(msg, code) {
        super()
        this.code = code || 0
        this.msg = msg || 'ok'
        this.status = 200
    }
}

class ParameterException extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 400
        this.msg = msg || '参数错误'
        this.errorCode = errorCode || 10000
    }
}

class NotFound extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 404
        this.msg = msg || '资源未找到'
        this.errorCode = errorCode || 10000
    }
}

class AuthFailed extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 401
        this.msg = msg || '认证失败'
        this.errorCode = errorCode || 10004
    }
}

class Forbbiden extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 403
        this.msg = msg || '禁止访问'
        this.errorCode = errorCode || 10006
    }
}

module.exports = {
    HttpException,
    Success,
    ParameterException,
    NotFound,
    AuthFailed,
    Forbbiden,
}