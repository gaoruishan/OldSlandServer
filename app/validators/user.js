const {LinValidator, Rule} = require('../../core/lin-validator')
const User = require('../models/user')

class UserValidator extends LinValidator {
    constructor() {
        super()
        this.email = [
            new Rule('isEmail', '请检查邮箱是否正确')
        ]
        this.password1 = [
            new Rule('isLength', '密码至少6个字符,最多32个字符', {
                min: 6,
                max: 32
            }),
            new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
        ]
        this.password2 = this.password1
        this.nickname = [
            new Rule('isLength', '昵称不符合规范', {
                min: 4,
                max: 32
            })
        ]
    }

    //必须以validate 开头, 自定义校验
    validatePassword(vals) {
        const psw1 = vals.body.password1
        const psw2 = vals.body.password2
        if (psw1 !== psw2) {
            throw new Error('两个密码不一致')
        }
    }
    //必须用async/await, 判断邮箱是否已存在
    async validateEmail(vals) {
        const email = vals.body.email
        const user = await User.findOne({
            where: {
                email
            }
        })
        if (user) {
            throw new Error('邮箱已存在!')
        }
    }
}

module.exports = UserValidator