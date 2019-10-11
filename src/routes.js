const router = require('express').Router()
const UserController = require('./app/Controllers/UserController')

router.post('/user', UserController.store)

module.exports = router