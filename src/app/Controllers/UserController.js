const { Users }  = require('../models')
class UserController {

    async store(request, response) {
        const { name, email, password } = request.body 
        const findUser = await Users.findOne({
            where:{
                email
            }
        })
        if(findUser)
            return request.status(400).send({ error:'Email already exists' })

        const user = await Users.create({
            name,
            email,
            password,
        })
        return response.json({ user })
    }

    async index(request, response) {

    }

    async show(request, response) {

    }

    async destroy(request, response) {

    }

    async update(request, response) {

    }
}

module.exports = new UserController()