const Router = require('koa-router')

const CommValidator = require('../../validators/CommValidator')
const {LoginType} = require('../../lib/Enum')
const User = require('../../models/User')
const util = require('../../../core/util')
const {Auth} = require('../../../middlewares/auth')
const {WXManager} = require('../../services/WXManager')

const router = new Router({
    prefix: '/v1/token'
})

async function emailLogin(account, psw) {
    const user = await User.verifyEmailPassword(account, psw)
    return util.generateToken(user.id, Auth.USER)
}

router.post('/', async (ctx) => {
    const v = await new CommValidator.TokenValidator().validate(ctx)
    const account = v.get('body.account')
    const psw = v.get('body.secret')
    let token
    switch (v.get('body.type')) {
        case LoginType.USER_MINI_PROGRAM:
            token = await WXManager.checkToToken(account)
            break
        case LoginType.USER_EMAIL:
            token = await emailLogin(account, psw)
            break
        case LoginType.USER_MOBILE:

            break
        default:
            throw new global.errs.ParameterException('没有相应的处理函数')
    }
    ctx.body = {
        token
    }
})

router.post('/verify',async (ctx)=>{
    const v = await new CommValidator.TokenEmptyValidator().validate(ctx)
    const result = Auth.verifyToken(v.get('body.token'))
    ctx.body={
        result
    }
})

module.exports = router