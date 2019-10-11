const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (request, response, next) => {
    try {
        const { authorization } = request.headers
        if (!authorization)
            response.status(400).send({ error: 'No token provide' })

        const auth = authorization.split(' ')

        if (auth.length !== 2) {
            response.status(400).send({ error: 'Invalid auth header' })
        }

        const [prefix, token] = auth

        if (/^Bearer$/.test(auth))
            response.status(400).send({ error: 'Invalid prefix ' })
        
        const decoded = jwt.verify(token,process.env.APP_SECRET)

        request.userId = decoded


    } catch (error) {
        response.status(400).send({ error: 'Erro on authentication ' })
    }

}