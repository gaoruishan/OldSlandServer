const Router = require('koa-router')
const {Auth} = require('../../../middlewares/auth')
const Flow = require('../../models/Flow')
const {ClassicService} = require('../../services/ClassicService')
const Like = require('../../models/Like')
const CommValidator = require('@validator')
const CommHelper = require('@helper')

const router = new Router({
    prefix: '/v1/classic'
})
router.post('/:type/:art_id/favor', new Auth().m, async (ctx) => {
    const v = await new CommValidator.LikeValidator().validate(ctx)
    const type = parseInt(v.get('path.type'))
    const id = v.get('path.art_id')
    const classic = await ClassicService.getClassicData(id, type)
    const like_status = await Like.isLikeStatus(id, type, ctx.auth.uid)
    ctx.body = {
        id,
        like_status,
        fav_nums: classic.fav_nums
    }
})

//实例化router,参数1:请求URL; 参数2:回调函数,带有ctx上下文,next执行函数
//添加Auth中间件, m是个属性
router.get('/latest', new Auth().m, async (ctx, next) => {
    const flow = await Flow.findOne({
        // 获取最新一期,使用order 用[] 对index 字段进行'DESC'倒序
        order: [
            ['index', 'DESC']
        ]
    })
    await CommHelper.setClassicDatas(flow, ctx)
})

router.get('/:index/next', new Auth().m, async (ctx) => {
    const flow = await CommHelper.getIndexClassic(ctx, 1)
    await CommHelper.setClassicDatas(flow, ctx)
})

router.get('/:index/previous', new Auth().m, async (ctx) => {
    const flow = await CommHelper.getIndexClassic(ctx, -1)
    await CommHelper.setClassicDatas(flow, ctx)
})


module.exports = router