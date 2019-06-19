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
    }
}