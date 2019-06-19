const Router = require('koa-router');
const CommValidator = require("../../validators/comm-validator");
const router = new Router();

//实例化router,参数1:请求URL; 参数2:回调函数,带有ctx上下文,next执行函数
//使用post传递4种参数
router.post('/v1/:id/classic/latest',async (ctx, next) => {
    const v = await new CommValidator.PositiveIntegerValidator().validate(ctx);

    ctx.body = {
        name: 'classic'
    }
});

module.exports = router;