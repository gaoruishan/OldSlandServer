const {HttpException} = require('../core/http-exception')

const catchError = async (ctx, next) => {
    try {
        console.error('-----------请求 start--------------')
        console.log(ctx.method)//请求类型
        console.log(ctx.path)//url
        console.log(ctx.params)// url中拼接参数
        console.log(ctx.request.query)//请求参数
        console.log(ctx.request.header)//请求头
        console.log(ctx.request.body)//请求体
        console.error('------------请求 end--------------')
        await next()
    } catch (e) {
        const isDev = global.config.env === 'dev'
        const isHttpException = e instanceof HttpException
        // 开发环境 不是HttpException
        if (isDev && !isHttpException) {
            throw e
        }
        console.log( e)

        if (isHttpException) {
            ctx.body = {
                msg: e.msg,
                status: e.status,
                code: e.code,
                request: `${ctx.method} ${ctx.path}`
            }
        } else {
            //未知异常
            ctx.body = {
                msg: 'we made a mistake O(∩_∩)O~~',
                code: 999,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 500
        }
    }
}

module.exports = {
    catchError
}