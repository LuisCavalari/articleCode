const { Users } = require('../models')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class SessionController {

    async store(request, response) {
        const { email, password } = request.body

        const user = await Users.findOne({
            where: {
                email
            }
        })

        if (!user)
            return response.status(400).send({ error: 'Email/Password incorrect' })
        
        if (!(await user.checkPassword(password))) {
            return response.status(400).send({ error: 'Email/Password incorrect' })
        }



        const token = jwt.sign({ id: user.id }, process.env.APP_SECRET, {
            expiresIn: '1d'
        })

        return response.json({ user, token })


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

module.exports = new SessionController()