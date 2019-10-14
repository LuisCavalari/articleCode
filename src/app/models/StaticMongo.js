const moongose = require('../../database/moongose')

const Static = new moongose.Schema({
    users: Number,
    categories: Number,
    articles: Number
})

const StaticSchema = moongose.model('Static',Static)

module.exports = StaticSchema