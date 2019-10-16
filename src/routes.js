const router = require('express').Router()
const admin = require('./app/middlewares/admin')
const auth = require('./app/middlewares/auth')
const UserCreateValidator = require('./app/Validators/UserCreate')
const CategorieCreateValidator = require('./app/Validators/CategorieCreate')
const CategorieController = require('./app/Controllers/CategoriesController')
const TreeController = require('./app/Controllers/TreeController')
const UserController = require('./app/Controllers/UserController')
const StaticsController = require('./app/Controllers/StaticsController')
const SessionControler = require('./app/Controllers/SessionController')
const ArticleTree = require('./app/Controllers/ArticleTree')
const ArticleController = require('./app/Controllers/ArticleController')

router.post('/user', UserCreateValidator, UserController.store)
router.post('/session', SessionControler.store)




// private routes bellow
router.use(auth)
router.get('/session', SessionControler.show)
router.get('/static',StaticsController.index)

router.get('/tree', TreeController.index)

router.get('/article_tree/:id', ArticleTree.show)

router.route('/article/:id')
    .get(ArticleController.show)
    .delete( admin ,ArticleController.destroy)

router.route('/article')
    .get(ArticleController.index)
    .post(ArticleController.store)

router.route('/categorie')
    .get(CategorieController.index)
    .post(CategorieCreateValidator, CategorieController.store)

// admin routes bellow
router.delete('/categorie/:id', admin, CategorieController.destroy)
router.delete('/article/:id', admin ,ArticleController.destroy)

module.exports = router