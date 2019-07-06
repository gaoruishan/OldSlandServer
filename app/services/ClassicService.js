const {Movie, Music, Sentence} = require('../models/Classic')
class ClassicService {
    /**
     * 获取 classic 数据
     * @param art_id
     * @param type
     * @returns {Promise<*>}
     */
    static async getClassicData(art_id, type) {
        const finder = {
            where: {
                id: art_id
            }
        }
        let classic = null
        switch (type) {
            case 100:
                classic = await Movie.findOne(finder)
                break
            case 200:
                classic = await Music.findOne(finder)
                break
            case 300:
                classic = await Sentence.findOne(finder)
                break
            case 400:

                break
            default:
                break
        }
        return classic
    }
}

module.exports = {
    ClassicService
}