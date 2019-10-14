const { Articles, Users } = require('../models')
class ArticleController {

    async store(request, response) {
        const { userId: user_id } = request
        const {
            name,
            description,
            content,
            categorie_id
        } = request.body
        try {

            const article = await Articles.create({
                name,
                description,
                content,
                'categorie_id': categorie_id,
                user_id,
            })

            if (article)
                return response.json(article)


        } catch (error) {
            return response.status(500).send({ error: 'Internal server error' })
        }


    }

    async index(request, response) {
        const { page = 1 } = request.body


        const limit = 1
        const offset = limit * (page - 1);
        const categories = await Articles.findAndCountAll({
            limit,
            offset,
            attributes: ['id', 'name', 'description', 'content', 'user_id'],
            include: [{
                model: Users,
                as: 'user'
            }]
        })
        const { rows: articles, count: totalItems } = categories
        const totalPages = Math.ceil(totalItems / limit)

        return response.json({ articles, totalPages, itemsPerPage })

    }

    async show(request, response) {
        try {
            const { id } = request.params
            const article = await Articles.findOne({
                attributes: ['id', 'name', 'content', 'description'],
                where: {
                    id
                }
            })

            if (!article)
                return response.status(400).send('')

            return response.json(article)
        } catch (error) {
            return response.status(400).send({ error: 'Internal server error' + error })
        }
    }

    async destroy(request, response) {
        const { id } = request.params
        if(!id)
            return response.status(400).send({ error:'Please inform the id of article' })
        
        try {
             const article = await Articles.destroy({
                where:{
                    id
                }
            })
            if(!article)
                return response.status(400).send({ error: 'Categorie not found' })
            
            return response.status(203).send()
        } catch (error) {
            return response.status(500).send({ error: 'Internal server error' })
        }
    }

    async update(request, response) {
        // TODO
    }
}

module.exports = new ArticleController()