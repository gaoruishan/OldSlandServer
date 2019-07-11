const {Sequelize, Model, Op} = require('sequelize')
const {sequelize} = require('../../core/db')
const util = require('util')
const axios = require('axios')

class Book extends Model {

    static async getYunShuSearch(start, count, q, summary = 1) {
        const url = util.format(global.config.yushu.keywordUrl, encodeURI(q), count, start, summary)
        const res = await axios.get(url)
        return res.data
    }

    static async getYunShuDetail(id) {
        const url = util.format(global.config.yushu.detailUrl, id)
        const res = await axios.get(url)
        return res.data
    }
}

Book.init({
    //book_id
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    fav_nums: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    tableName:
        'book'
})

module.exports = Book