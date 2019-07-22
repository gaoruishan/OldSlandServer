const Router = require('koa-router')
const {Auth} = require('../../../middlewares/auth')
const CommValidator = require('@validator')
const {success} = require('@helper')
const Like = require('../../models/Like')

const router = new Router({
    prefix: '/v1/like'
})
/**
 * 进行点赞
 */
router.post('/', new Auth().m, async (ctx) => {
    const v = await new CommValidator.LikeValidator().validate(ctx)
    //uid不建议传递,从token中取
    await  Like.onLike(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid)

    success()
})
/**
 * 取消点赞
 */
router.post('/cancel', new Auth().m, async (ctx) => {
    const v = await new CommValidator.LikeValidator().validate(ctx)
    await Like.disLike(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid)
    success()
})


module.exports = router