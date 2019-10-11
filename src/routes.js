const router = require('express').Router()
const auth = require('./app/middlewares/auth')
const UserCreateValidator = require('./app/Validators/UserCreate') 
const UserController = require('./app/Controllers/UserController')
const SessionControler = require('./app/Controllers/SessionController')

router.post('/user', UserCreateValidator , UserController.store)
router.post('/session', SessionControler.store)
// private routes bellow
router.use(auth)

module.exports = router