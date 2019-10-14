const { Articles, Users, sequelize, Sequelize } = require('../models')
const { Op } = Sequelize
const { recursiveQuery } = require('../util/customQuerys')

class ArticleTree {

    async show(request, response) {
        const { id } = request.params
        const { page = 1 } = request.query
        const limit = 10
        const offset = limit * (page - 1)

        const query = await sequelize.query(recursiveQuery(id))
        const categories = query[0].map(categorie => categorie.id)

        const articles = await Articles.findAll({
            attributes: ['id', 'name', 'categorie_id'],
            where: {
                categorie_id: {
                    [Op.in]: categories
                },
            },
            offset,
            limit,
            include: [{
                model: Users,
                as: 'user',
                attributes: ['id', 'name', 'email']
            }]
        })

        return response.json(articles)
    }



}


module.exports = new ArticleTree()