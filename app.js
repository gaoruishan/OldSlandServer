require('module-alias/register')
const Koa = require('koa')
const path = require('path')
const static = require('koa-static')
const parser = require('koa-bodyparser')
let https = require("https")
let fs = require("fs")
const {InitManager} = require('./core/init')
const {catchError} = require('./middlewares/exception')
//导入Model 创建数据库表
// require('./app/models/User')

const app = new Koa()
//第一个中间件,通过next捕获异常
app.use(catchError)
//post请求转换body,parser()因为是function
app.use(parser())
//将./static文件目录 加入到 __dirname=/Users/gaoruishan/Html5/MyProject/OldSlandServer
app.use(static(path.join(__dirname,'./static')))
//InitManager进行统一初始化
InitManager.initCore(app)

//HTTPS配置
const httpsOption = {
    key : fs.readFileSync("./ssl/0_gaoruishan.cn.key"),
    cert: fs.readFileSync("./ssl/1_gaoruishan.cn_bundle.pem")
}

//开启监听接口
https.createServer(httpsOption, app.callback()).listen(3000)
