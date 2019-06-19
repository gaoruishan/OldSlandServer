const Router = require('koa-router')
const UserValidator = require("../../validators/user")
const User = require('../../models/user')
const {success} = require("../../lib/comm-helper")

//使用前缀,省去每个接口加'/v1/user'
const router = new Router({
    prefix: '/v1/user'
})
//注意要加 async 和await
router.post('/register', async (ctx) => {
    const v = await new UserValidator().validate(ctx)
    const user = {
        email: v.get('body.email'),
        nickname: v.get('body.nickname'),
        password: v.get('body.password2')
    }
    //添加数据
    console.log(user)
    await User.create(user)
    success()
})

module.exports = router