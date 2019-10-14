const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const scheduler = require('./app/middlewares/scheduler')
class App{
    
    constructor(){
        this.express = express()
        this.middlewares()
        this.routes()
    }
    middlewares(){
        this.express.use(express.json())
        this.express.use(cors())
        this.express.use(helmet())        
        this.express.use(scheduler)
        
    }
    routes(){
        this.express.use(require('./routes'))
    }
}

module.exports = new App().express