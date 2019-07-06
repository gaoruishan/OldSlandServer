const {Sequelize, Model} = require('sequelize')
const {sequelize} = require('../../core/db')

const classicFields = {
    title: Sequelize.STRING,
    image: Sequelize.STRING,
    content: Sequelize.STRING,
    //0后1格式
    type: Sequelize.TINYINT,
    //时间格式
    pubdate: Sequelize.DATEONLY,
    fav_nums: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
}

class Movie extends Model {

}

Movie.init(classicFields, {
    sequelize,
    tableName: 'movie'
})

class Music extends Model {

}

//组装对象: Object.assign
const musicFields = Object.assign({
    url: Sequelize.STRING
}, classicFields)

Music.init(musicFields, {
    sequelize,
    tableName: 'music'
})

class Sentence extends Model {

}

Sentence.init(classicFields, {
    sequelize,
    tableName: 'sentence'
})


module.exports = {
    Movie,
    Music,
    Sentence,
}