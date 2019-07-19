const {Sequelize, Model} = require('sequelize')
const {unset, clone, isArray} = require('lodash')
//导入配置文件
const {dbName, user, password, host, port} = require('../config/config').database

//实例化对象: 参数1:数据库名; 参数2:用户名; 参数3:密码; 参数4:可配置项
const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',//要连接的数据库类型。可选值有：mysql、postgres、sqlite、mariadb、mssql
    host,
    port,
    logging: true,//输出log
    timezone: '+08:00',//设置北京时间
    define: {
        //定义模型的选项: 修改create_time  update_time delete_time
        timestamps: true,//为模型添加 createdAt 和 updatedAt 两个时间戳字段
        paranoid: true,//使用逻辑删除。设置为true后，调用 destroy 方法时将不会删队模型，而是设置一个 deletedAt 列。此设置需要 timestamps=true
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true,//转换列名的驼峰命名规则为下划线命令规则
        freezeTableName: true//设置为true时，sequelize不会改变表名，否则可能会按其规则有所调整
    }
})
/**
 * 注意!!! 线上一定改为false,改变表结构,强制删除表
 */
sequelize.sync({
    force: false
})
//全局的控制不需要字段
Model.prototype.toJSON = function () {

    //this指代Model,dataValues里面需要序列化数据,clone一份
    const data = clone(this.dataValues)
    //unset去除某个字段
    unset(data, 'updated_at')
    unset(data, 'created_at')
    unset(data, 'deleted_at')

    //定义需要排除的exclude
    if (isArray(this.exclude)) {
        this.exclude.forEach(e => {
            unset(data, e)
        })
    }
    for (key in data){
        if(key === 'image'){
            if(!data[key].startsWith('http'))
                data[key]=global.config.host + data[key]
        }
    }
    return data
}
module.exports = {
    sequelize
}