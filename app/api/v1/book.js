const Router = require('koa-router');
const router = new Router();

router.get('/v1/book/latest', (ctx, next) => {
    ctx.body = {
        name: 'book'
    }

    throw  new global.errs.HttpException('API expection',10002,400)
});

module.exports = router;