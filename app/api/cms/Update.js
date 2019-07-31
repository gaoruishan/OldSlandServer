const Router = require('koa-router')
const path = require('path')
const fs = require("fs")

//使用前缀,省去每个接口加'/v1/user'
const router = new Router({
    prefix: '/app'
})
/**
 * 检查是否有patch文件更新
 */
router.get('/tinker/update', async (ctx) => {
    const p = process.cwd() + "/static"
    let files = await fs.readdirSync(p)
    let downloadUrl = ""
    //没有包含 返回-1
    if (files.indexOf('apk') !== -1) {
        let files = await fs.readdirSync(p + "/apk")
        console.log(files)
        if (files && files.length > 0) {//取最后一个
            downloadUrl = global.config.host + "apk/" + files[files.length - 1]
        }
    }

    const data = {
        downloadUrl, //不为空则表明有更新
        versionName: "v1.0.0",//本次patch包的版本号
        patchMessage: "热更新", //本次patch包含的相关信息，例如：主要做了那些改动
        md5: "",//patch文件正确的md5值
    }
    ctx.body = {
        msg: "ok",
        status: 200,
        code: 0,
        data
    }
})

module.exports = router