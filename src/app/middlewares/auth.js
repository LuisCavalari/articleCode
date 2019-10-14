const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (request, response, next) => {

    const { authorization } = request.headers
    if (!authorization)
        response.status(400).send({ error: 'No token provide' })

    const auth = authorization.split(' ')

    if (auth.length !== 2) {
        response.status(400).send({ error: 'Invalid auth header' })
    }

    const [prefix, token] = auth

    if (!/^Bearer$/.test(prefix))
        response.status(400).send({ error: 'Invalid prefix ' })
    try {
        
        jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
            if (err) {
                return response.status(400).send({ error: 'Invalid token' })
            }
            request.userId = decoded.id;
        })

        return next()




    } catch (error) {
        response.status(400).send({ error: 'Erro on authentication ' })
    }

}