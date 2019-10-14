const { Categories } = require('../models')

class TreeController {



    async index(request, response) {
        const categoriesDb = await Categories.findAll()

        const categories = categoriesDb.map(cat => { return { name: cat.name, id: cat.id, parent_id: cat.parent_id } })
        const getTree = (categorie, tree) => {
            if (!tree)
                tree = categories.filter(cat => !cat.parent_id)

            tree = tree.map(parent => {
                const isChild = node => node.parent_id === parent.id
                parent.children = getTree(categorie, categorie.filter(isChild))
                return parent
            })
            return tree;

        }


        return response.json(getTree(categories))



    }

    async show(request, response) {
    
    }



}

module.exports = new TreeController()