const Router = require('koa-router')
const {Auth} = require('../../../middlewares/auth')
const HotBook = require('../../models/HotBook')
const Like = require('../../models/Like')
const Comment = require('../../models/Comment')
const Book = require('../../models/Book')
const CommValidator = require('../../validators/CommValidator')
const Enum = require('../../lib/Enum')
const {success} = require('../../lib/Helper')
const router = new Router({
    prefix: '/v1/book'
})

/**
 * 获取热门书籍
 */
router.get('/hot_list', new Auth().m, async (ctx, next) => {
    const books = await  HotBook.getHotList()
    ctx.body = {
        books,
        total: books.length
    }
})
/**
 * 获取喜欢书籍数量
 */
router.get('/favor/count', new Auth().m, async (ctx) => {
    const count = await Like.getLikeBookCount(ctx.auth.uid)
    ctx.body = {
        count
    }
})

/**
 * 获取点赞的书籍列表
 */
router.get('/favor', new Auth().m, async (ctx) => {
    const likeList = await Like.getUserBookLikes(ctx.auth.uid)
    let arrObj = []
    for (const like of likeList) {
        // arrObj.push(like.art_id)
        const book = await Book.getYunShuDetail(like.art_id)
        arrObj.push(book)
    }
    ctx.body = arrObj
})
/**
 * 新增短评
 */
router.post('/add/short_comment', new Auth().m, async (ctx) => {
    const v = await new CommValidator.BookCommentValidator().validate(ctx)
    const book_id = v.get('body.book_id')
    const content = v.get('body.content')
    await Comment.addComment(book_id, content)
    success()
})
/**
 * 获取书籍短评
 */
router.get('/:book_id/short_comment', new Auth().m, async (ctx) => {
    const v = await new CommValidator.PositiveIntegerValidator().validate(ctx, {
        id: 'book_id'
    })
    const book_id = v.get('path.book_id')
    const comment = await Comment.getComment(book_id)
    ctx.body = {
        comment,
        book_id,
    }
})
/**
 * 获取热搜关键字
 */
router.get('/hot_keyword', new Auth().m, async (ctx) => {
    ctx.body = {
        "hot":
            [
                "Fluent Python",
                "Python",
                "小程序Java核心编程",
                "慕课网7七月",
                "微信小程序开发入门与实践",
                "C++"
            ]
    }
})
/**
 * 书籍搜索
 */
router.get('/search', new Auth().m, async (ctx) => {
    const v = await new CommValidator.SearchValidator().validate(ctx)
    const start = v.get('query.start')
    const count = v.get('query.count')
    const q = v.get('query.q')
    const books = await Book.getYunShuSearch(start, count, q)
    ctx.body = books
})
/**
 * 获取书籍详细信息
 */
router.get('/:id/detail', new Auth().m, async (ctx) => {
    const v = await new CommValidator.PositiveIntegerValidator().validate(ctx)
    const book = await Book.getYunShuDetail(v.get('path.id'))
    ctx.body = {
        ...book,
        type: 400,
    }
})

module.exports = router