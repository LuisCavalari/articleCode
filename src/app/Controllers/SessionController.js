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
        user.password_hash = undefined



        const token = await jwt.sign({ id: user.id }, process.env.APP_SECRET, {
            expiresIn: '1d'
        })

        return response.json({ user, token })


    }


    async show(request, response) {
        const { userId } = request

        const user = await Users.findOne({
            where:{
                id:userId, 
            }
        })


        if(!user)
            return response.status(400).send({ error: 'User not found' })

        user.password_hash = undefined
        
        return response.json({ user })

    }

}

module.exports = new SessionController()