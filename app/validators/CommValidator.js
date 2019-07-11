const {LinValidator, Rule} = require('../../core/lin-validator')
const Enum = require('@enum')
/**
 * 校验id
 * @type {*[]}
 */
const isInt = [
    new Rule('isInt', '需要是正整数', {
        min: 1
    }),
]

/**
 * 校验是否为空
 * @param val
 * @returns {*[]}
 */
function isEmpty(val) {
    return [
        new Rule('isLength', val, {
            min: 1
        })
    ]
}

/**
 * 校验Classic类型
 * @param vals
 */
function checkClassicType(vals) {
    let type = vals.body.type || vals.path.type
    if (!type) {
        throw new Error('type是必传参数')
    }
    type = parseInt(type)
    if (!Enum.ClassicType.isThisType(type)) {
        throw new Error('type参数不合法')
    }
}

class PositiveIntegerValidator extends LinValidator {
    constructor() {
        super()
        this.id = isInt
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

class TokenEmptyValidator extends LinValidator {
    constructor() {
        super()
        this.token = isEmpty('token不能为空')
    }
}

class LikeValidator extends LinValidator {
    constructor() {
        super()
        this.art_id = isInt
        //将方法赋值给validateType
        this.validateType = checkClassicType
    }
}

class BookCommentValidator extends LinValidator {
    constructor() {
        super()
        this.book_id = isInt
        this.content = [
            new Rule('isLength', '评论内容范围为12字以内', {
                min: 1,
                max: 12
            })
        ]
    }
}

class SearchValidator extends LinValidator {
    constructor() {
        super()
        this.start = [
            new Rule('isInt', '不符合规范', {
                min: 0,
                max: 1000
            }),
            new Rule('isOptional','',0)
        ]
        this.count = [
            new Rule('isInt', '不符合规范', {
                min:1,
                max: 20
            }),
            new Rule('isOptional','',20)
        ]
        this.q = [
            new Rule('isLength', '请输入搜索内容', {
                min: 1
            })
        ]
    }
}

module.exports = {
    PositiveIntegerValidator,
    TokenValidator,
    TokenEmptyValidator,
    LikeValidator,
    BookCommentValidator,
    SearchValidator,
}