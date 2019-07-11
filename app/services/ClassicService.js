const {Movie, Music, Sentence} = require('../models/Classic')
const {Op} = require('sequelize')
const {flatten} = require('lodash')

//只能导入Classic相关模型
class ClassicService {

    static async getLikeData(likeList) {
        const artIdObj = {
            100: [],
            200: [],
            300: []
        }
        //of数组遍历 分三类push到数组中
        for (const like of likeList) {
            artIdObj[like.type].push(like.art_id)
        }
        const classicList = []
        //in对象遍历
        for (let key in artIdObj) {
            const ids = artIdObj[key]
            key = parseInt(key)
            if (ids.length > 0) {
                const list = await this._getDataByIds(ids, key)
                classicList.push(list)
            }
        }
        //将二维数组分解[[1],[2,3]]=>[1,2,3]
        return flatten(classicList)
    }

    static async _getDataByIds(ids, type) {
        const finder = {
            // 用数组id字段查询 返回数组
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        }
        let classic = null
        switch (type) {
            case 100:
                classic = await Movie.findAll(finder)
                break
            case 200:
                classic = await Music.findAll(finder)
                break
            case 300:
                classic = await Sentence.findAll(finder)
                break
            case 400:
                break
            default:
                break
        }
        return classic
    }

    /**
     * 获取 classic 数据
     * @param art_id
     * @param type
     * @returns {Promise<*>}
     */
    static async getClassicData(art_id, type) {
        const finder = {
            where: {
                id: art_id
            }
        }
        let classic = null
        switch (type) {
            case 100:
                classic = await Movie.findOne(finder)
                break
            case 200:
                classic = await Music.findOne(finder)
                break
            case 300:
                classic = await Sentence.findOne(finder)
                break
            case 400:

                break
            default:
                break
        }
        return classic
    }
}

module.exports = {
    ClassicService
}