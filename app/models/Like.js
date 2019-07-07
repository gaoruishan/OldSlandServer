const {Sequelize, Model, Op} = require('sequelize')
const {sequelize} = require('../../core/db')
const {ClassicService} = require('../services/ClassicService')

class Like extends Model {

    static async onLike(art_id, type, uid) {
        const like = await Like.findOne({
            where: {
                art_id,
                type
            }
        })
        if (like) {
            throw new global.errs.HttpException('已经点赞')
        }
        //使用sequelize 事务, 必须用transaction: t 链式调用
        return sequelize.transaction(async t => {
            await Like.create({
                art_id,
                type,
                uid
            }, {transaction: t})
            //'类名'调用相当于'表'; '对象'调用相当于'一条数据'
            const classic = await ClassicService.getClassicData(art_id, type)
            //increment自增方法, 参数1: 需要自增字段; {by自增的单位,传递事务}
            await classic.increment('fav_nums', {
                by: 1,
                transaction: t
            })
        })
    }

    static async disLike(art_id, type, uid) {
        const like = await  Like.findOne({
            where: {art_id}
        })
        if (!like) {
            throw new global.errs.HttpException('未点赞')
        }
        return sequelize.transaction(async t => {
            await like.destroy({
                force: true,
                transaction: t
            })
            const classic = await  ClassicService.getClassicData(art_id, type)
            await classic.decrement('fav_nums', {
                by: 1,
                transaction: t
            })
        })
    }

    static async isLikeStatus(art_id, type, uid) {
        const like = await Like.findOne({
            where: {
                art_id,
                type,
                uid
            }
        })
        return like ? true : false
    }

    static async getUserLikes(uid) {
        const likes = await Like.findAll({
            where: {
                uid,
                //对classic类型排除400,其中[Op.not]是key一种字符串的写法
                // ,Op.not是Sequelize的
                type: {
                    [Op.not]: 400
                }
            }
        })
        if (!likes) {
            throw new global.errs.NotFound()
        }
        return likes
    }
}

Like.init({
    uid: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER,
}, {
    sequelize,
    tableName: 'like'
})

module.exports = Like