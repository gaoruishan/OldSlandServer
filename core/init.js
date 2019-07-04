//require-directory包  调用requireDir方法进行遍历目录下文件
const requireDir = require('require-directory')
//koa-router包 通过路由来分发请求url
const Router = require('koa-router')

class InitManager {
    /**
     * 初始化
     * @param app
     */
    static initCore(app) {
        InitManager.app = app
        InitManager.initLoadRouters()
        InitManager.loadHttpException()
        InitManager.loadConfig()

    }

    /**
     * 初始加载路由
     */
    static initLoadRouters() {
        //使用绝对路径
        const apiDir = `${process.cwd()}/app/api`

        function whenLoadModule(obj) {
            //判断是否是路由,使用中间件
            if (obj instanceof Router) {
                InitManager.app.use(obj.routes())
            }
        }

        //不能实例对象, 参数1:module; 参数2:路径; 参数3: 每查找一个文件回调一下
        requireDir(module, apiDir, {
            visit: whenLoadModule
        })
    }

    /**
     * 加载全局的异常
     */
    static loadHttpException() {
        global.errs = require('./http-exception')
    }

    /**
     * 加载全局配置
     */
    static loadConfig() {
        const configDir = `${process.cwd()}/config/config`
        global.config = require(configDir)
    }
}

module.exports = InitManager