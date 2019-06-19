const {Sequelize, Model} = require('sequelize')
const bcrypt = require('bcryptjs')
const {sequelize} = require('../../core/db')

class User extends Model {

}

User.init({//参数1: User字段项
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nickname: Sequelize.STRING,
    //设置unique 需要指定长度
    email: {
        type: Sequelize.STRING(128),
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        set(val) {//加密
            const salt = bcrypt.genSaltSync(10)
            const psw = bcrypt.hashSync(val, salt)
            this.setDataValue('password',psw)
        }
    },
    openid: {
        type: Sequelize.STRING(64),
        unique: true
    },
}, {//参数2:User表配置
    sequelize,
    tableName: 'user'
})

module.exports = User
