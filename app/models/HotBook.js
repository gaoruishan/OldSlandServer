const {Sequelize, Model, Op} = require('sequelize')
const {sequelize} = require('../../core/db')
const Like = require('../models/Like')

class HotBook extends Model {

    static async getHotList() {
        const list = await HotBook.findAll({
            order: ['index']
        })
        //获取fav_nums, for循环不要查询
        const ids = []
        list.forEach(book => {
            ids.push(book.id)
        })
        //对一组ids查询,且art_id分组,并对art_id用COUNT计数
        const likes = await Like.findAll({
            where: {
                art_id: {
                    [Op.in]: ids
                },
                type: 400
            },
            //findOne还是findAll取决于where中id是否数组!! 数组->需要group
            group: 'art_id',
            //对art_id计数,并赋值给count变量
            attributes: ['art_id', [Sequelize.fn('COUNT', '*'), 'count']]
        })
        list.forEach(book => {
            likes.forEach(like => {
                if (like.art_id === book.id) {
                    //通过对象的get('count')获取变量值
                    book.setDataValue('fav_nums',like.get('count'))
                }
            })
        })

        return list
    }
}

HotBook.init({
    author: Sequelize.STRING,
    image: Sequelize.STRING,
    title: Sequelize.STRING,
    status: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    tableName: 'hot_book'
})

module.exports = HotBook