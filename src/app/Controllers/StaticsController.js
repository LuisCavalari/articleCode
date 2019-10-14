const Static = require('../models/StaticMongo')

class StaticsController {

    async store(request, response) {

    }

    async index(request, response) {
        const defaultValue = {
            users: 0,
            categories: 0,
            articles: 0
        }
        const statics = await Static.find({
            sort: { 'createdAt': -1 }
        })
        if (statics.length <= 0)
            return response.json(defaultValue)

        return response.json(statics)



    }


}
module.exports = new StaticsController()