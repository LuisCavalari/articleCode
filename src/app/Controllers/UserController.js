const { Users } = require('../models')
class UserController {

    async store(request, response) {
        const { name, email, password, admin } = request.body
        const findUser = await Users.findOne({
            where: {
                email
            }
        })
        if (findUser)
            return response.status(400).send({ error: 'Email already exists' })

        const user = await Users.create({
            name,
            email,
            password,
            admin,
        })
        user.password_hash = undefined
        return response.json({ user })
    }


    async destroy(request, response) {

    }

    async update(request, response) {

    }
}

module.exports = new UserController()