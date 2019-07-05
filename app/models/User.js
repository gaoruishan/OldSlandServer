//sequelize包 用于连接MySQL数据库操作的工具
const {Sequelize, Model} = require('sequelize')
//bcryptjs包 用于加密/解密
const bcrypt = require('bcryptjs')
const {sequelize} = require('../../core/db')

//定义模型,继承Model
class User extends Model {

    /**
     * 验证邮箱/密码
     * 注:静态方法 async 在方法名前面
     */
    static async verifyEmailPassword(email, password) {
        const user = await User.findOne({
            where: {
                email
            }
        })
        if (!user) {
            throw new global.errs.AuthFailed('账户不存在')
        }
        //正确
        const correct = bcrypt.compareSync(password, user.password)
        if (!correct) {
            throw new global.errs.AuthFailed('密码不正确')
        }
        return user
    }

    static async getUserByOpenId(openid) {
        const user = await User.findOne({
            where: {
                openid
            }
        })
        return user
    }

    static async registerUserByOpenId(openid) {
        return await User.create({
            openid
        })
    }
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
        set(val) {//当set密码时调用 进行加密
            const salt = bcrypt.genSaltSync(10)
            const psw = bcrypt.hashSync(val, salt)
            this.setDataValue('password', psw)
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
