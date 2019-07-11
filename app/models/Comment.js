const {Sequelize, Model, Op} = require('sequelize')
const {sequelize} = require('../../core/db')

class Comment extends Model {

    static async addComment(book_id, content) {
        const c = await Comment.findOne({
            where: {
                book_id,
                content
            }
        })
        if (!c) {
            return await  Comment.create({
                book_id,
                content,
                nums: 1
            })
        } else {//用对象方式 不用加Attribute
            return await c.increment('nums', {
                by: 1
            })
        }
    }

    static async getComment(book_id) {
        return await Comment.findAll({
            where: {
                book_id
            }
        })
    }
}

Comment.init({
    content: Sequelize.STRING(12),
    book_id: Sequelize.INTEGER,
    nums: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    tableName: 'comment'
})

module.exports = Comment