const { Users } = require('../models')
module.exports =  async (request, response, next) => {
    const { userId: id } = request
    const user = await Users.findOne({
        where:{
            id,
        }
        
    })
    if (!user.admin)
        return response.status(401).send({ error: 'Users is not admin' })

    return next()
}