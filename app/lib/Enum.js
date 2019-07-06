/**
 * 检查当前'枚举'是当前对象中的'枚举'
 * @param val
 * @returns {boolean}
 */
function isThisType(val) {
    //必须放到对象里面, this 指代当前对象
    for (let key in this) {
        if (this[key] === val) {
            return true
        }
    }
    return false
}


//模拟枚举, 必须加一个isThisType
const LoginType = {
    USER_MINI_PROGRAM: 100,
    USER_EMAIL: 101,
    USER_MOBILE: 102,
    ADMIN_EMAIL: 200,
    isThisType
}

const ClassicType ={
    MOVIE:100,
    MUSIC:200,
    SENTENCE:300,
    BOOK:400,
    isThisType
}

module.exports = {
    LoginType,
    ClassicType,
}