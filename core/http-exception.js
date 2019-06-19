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

module.exports = {
    HttpException,
    Success,
    ParameterException
}