
/**
 * 通用执行成功
 * @param msg
 * @param code
 */
function success(msg, code) {
    throw new global.errs.Success(msg, code)
}



module.exports = {
    success,
}