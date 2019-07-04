const Router = require('koa-router');
const CommValidator = require("../../validators/CommValidator");
const {Auth} = require('../../../middlewares/auth')
const router = new Router({
    prefix:'/v1/classic'
});

//实例化router,参数1:请求URL; 参数2:回调函数,带有ctx上下文,next执行函数
//添加Auth中间件, m是个属性
router.get('/latest',new Auth().m,async (ctx, next) => {
    // const v = await new CommValidator.PositiveIntegerValidator().validate(ctx);
    ctx.body = {
        name: ctx.auth
    }
});

module.exports = router;