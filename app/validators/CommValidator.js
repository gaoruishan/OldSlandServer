const {LinValidator, Rule} = require('../../core/lin-validator')
const Enum = require('../lib/Enum')

class PositiveIntegerValidator extends LinValidator {
    constructor() {
        super()
        this.id = [
            new Rule('isInt', '需要是正整数', {
                min: 1
            }),
        ]
    }
}

class TokenValidator extends LinValidator {
    constructor() {
        super()
        this.account = [
            new Rule('isLength', '不符合账号规则', {
                min: 4,
                max: 32
            })
        ]
        this.secret = [
            // 可空,也可不为空
            new Rule('isOptional'),
            new Rule('isLength', '至少6个字符', {
                min: 6,
                max: 128
            })
        ]
    }
    // 自定义校验, 默认vals相当于ctx
    validateLoginType(vals) {
        if (!vals.body.type) {
            throw new Error('type是必传参数')
        }
        if (!Enum.LoginType.isThisType(vals.body.type)) {
            throw new Error('type参数不合法')
        }
    }
}

module.exports = {
    PositiveIntegerValidator,
    TokenValidator,
}