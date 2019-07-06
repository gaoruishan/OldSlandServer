const CommValidator = require('@validator')
const Flow = require('../models/Flow')
const {ClassicService} = require('../services/ClassicService')
const Like = require('../models/Like')


/**
 * 通用执行成功
 * @param msg
 * @param code
 */
function success(msg, code) {
    throw new global.errs.Success(msg, code)
}

/**
 * 获取指定index的Classic
 * @param ctx
 * @param offset
 * @returns {Promise<(Model | null) | Model>}
 */
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
/**
 * 填充classic数据
 * @param flow
 * @param ctx
 * @returns {Promise<void>}
 */
let setClassicDatas = async function (flow, ctx) {
    const classic = await ClassicService.getClassicData(flow.art_id, flow.type)
    //Sequelize 自带的序列化,将index字段添加到classic中,并转为json
    classic.setDataValue('index', flow.index)
    const likeStatus = await Like.isLikeStatus(flow.art_id, flow.type, ctx.auth.uid)
    classic.setDataValue('like_status', likeStatus)
    ctx.body = classic
}

module.exports = {
    success,
    getIndexClassic,
    setClassicDatas,
}