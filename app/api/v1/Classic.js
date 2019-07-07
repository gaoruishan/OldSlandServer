const Router = require('koa-router')
const {Auth} = require('../../../middlewares/auth')
const Flow = require('../../models/Flow')
const {ClassicService} = require('../../services/ClassicService')
const Like = require('../../models/Like')
const CommValidator = require('@validator')

const router = new Router({
    prefix: '/v1/classic'
})

let getIndexClassic = async function (ctx, offset) {
    //validate第二个参数:设置别名id 变为index
    const v = await new CommValidator.PositiveIntegerValidator().validate(ctx, {
        id: 'index'
    })
    const index = v.get('path.index') + offset
    const flow = await Flow.findOne({
        where: {index}
    })
    if (!flow) {
        throw new global.errs.NotFound()
    }
    return flow
}
let setClassicDatas = async function (flow, ctx) {
    const classic = await ClassicService.getClassicData(flow.art_id, flow.type)
    //Sequelize 自带的序列化,将index字段添加到classic中,并转为json
    classic.setDataValue('index', flow.index)
    const likeStatus = await Like.isLikeStatus(flow.art_id, flow.type, ctx.auth.uid)
    classic.setDataValue('like_status', likeStatus)
    ctx.body = classic
}
/**
 * 获取最新一期
 */
//实例化router,参数1:请求URL; 参数2:回调函数,带有ctx上下文,next执行函数
//添加Auth中间件, m是个属性
router.get('/latest', new Auth().m, async (ctx, next) => {
    const flow = await Flow.findOne({
        // 获取最新一期,使用order 用[] 对index 字段进行'DESC'倒序
        order: [
            ['index', 'DESC']
        ]
    })
    await  setClassicDatas(flow, ctx)
})
/**
 * 获取当前一期的下一期
 */
router.get('/:index/next', new Auth().m, async (ctx) => {
    const flow = await  getIndexClassic(ctx, 1)
    await  setClassicDatas(flow, ctx)
})
/**
 * 获取当前一期的上一期
 */
router.get('/:index/previous', new Auth().m, async (ctx) => {
    const flow = await  getIndexClassic(ctx, -1)
    await  setClassicDatas(flow, ctx)
})
/**
 * 获取某一期详细信息
 */
router.get('/:type/:art_id', new Auth().m, async (ctx) => {
    const v = await new CommValidator.LikeValidator().validate(ctx)
    const type = parseInt(v.get('path.type'))
    const id = v.get('path.art_id')
    const classic = await ClassicService.getClassicData(id, type)
    const like_status = await Like.isLikeStatus(id, type, ctx.auth.uid)
    classic.setDataValue('like_status', like_status)
    ctx.body = classic
})
/**
 * 获取点赞信息
 */
router.get('/:type/:art_id/favor', new Auth().m, async (ctx) => {
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
/**
 * 获取我喜欢的期刊
 */
router.get('/favor', new Auth().m, async (ctx) => {
    const likes = await Like.getUserLikes(ctx.auth.uid)
    const classics = await ClassicService.getLikeData(likes)
    ctx.body = {
        classics
    }
})


module.exports = router