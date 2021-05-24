const router = require('express').Router()

const auth = require('../middlewares/auth')
const articleController = require('../controllers/article.controllers')


router.get('/all', articleController.findAll)
router.get('/:slug', articleController.findArticle)

router.post('/post', auth.isLoggedIn, auth.isAdmin, articleController.postArticle)


module.exports = router
