/**
 * 全局的配置信息
 * @type {{env: string, database: {dbName: string, host: string, port: string, user: string, password: string}}}
 */
module.exports = {
    env: 'dev',
    database: {
        dbName: 'oldsland',
        host: 'localhost',
        port: '3307',
        user: 'root',
        password: 'admin'
    },
    security:{
        secretKey:"abcdefg",
        expiresIn:60*60*24*30
    },
    wx:{
        appId:'',
        appSecret:'',
        loginUrl:'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    },
    yushu:{
        detailUrl:'http://t.yushu.im/v2/book/id/%s',
        keywordUrl:'http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s'
    },
    host:'https://localhost:3000/',
}
