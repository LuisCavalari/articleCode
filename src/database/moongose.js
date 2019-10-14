require('dotenv').config()

const moongose = require('mongoose')
try {
    moongose.connect(process.env.MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify:true
    })
} catch (error) {
    console.log(error)
}

module.exports = moongose