const { Categories } = require('../models')
class CategoriesController {

    async store(request, response) {
        const { id,name, parent_id: parent } = request.body
        const categorie = await Categories.upsert({
            id,
            name,
            parent_id: parent,
        })


        return response.json(categorie)

    }

    async index(request, response) {

        const categories = await Categories.findAll()

        const findParent = (parent) => {
            const parentCategorie = categories.filter(categorie =>
                categorie.id === parent)
            return parentCategorie.length > 0 ? parentCategorie[0] : null
        }

        const expandedCategories = categories.map(categorie => {
            const { id, name,parent_id } = categorie
            let path = categorie.name
            let parent = findParent(categorie.parent_id)
            while (parent) {
                path = `${parent.name} > ${path}`
                parent = findParent(parent.parent_id)
            }

            return { id, name, path , parent_id}

        })


        return response.json(expandedCategories)

    }

    async show(request, response) {

    }

    async destroy(request, response) {
        const { id } = request.params

        const categorie = await Categories.findOne({
            where: {
                parent_id:id,
            }
        })

        if(categorie){
            return response.status(400).json({ message: 'Error, categorie have subcategories' })
        }

        await Categories.destroy({
            where:{
                id
            }
        })

        return response.status(203).send()

    }

    async update(request, response) {

    }

}

module.exports = new CategoriesController()