const Koa = require('koa')
const parser = require('koa-bodyparser')
const {InitManager} = require('./core/init')
const {catchError} = require('./middlewares/exception')
//导入Model 创建数据库表
require('./app/models/User')

const app = new Koa()
//第一个中间件,通过next捕获异常
app.use(catchError)
//post请求转换body,parser()因为是function
app.use(parser())
//InitManager进行统一初始化
InitManager.initCore(app)

//开启监听接口
app.listen(3000)
