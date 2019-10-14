const scheduler = require('node-schedule')

const Static = require('../models/StaticMongo')
const { Articles, Users, Categories } = require('../models')
module.exports = (request, response, next) => {
    console.log('entrou')
    scheduler.scheduleJob('*/1 * * * *', async function () {
        // const articleCount = await Articles.count()
        // const userCount = await Users.count()

        // const categoriesCount = await Categories.count()

        // const Static = await Static.upse({
        //     articles:articleCount,
        //     categories:categoriesCount,
        //     users: userCount,
        // })

        // console.log('Estaticas atualizadas')
        
        
    })
    return next()


}