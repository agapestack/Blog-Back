const express = require('express');

const router = express.Router();
const usersRouter = require('./users.routes')
const articlesRouter = require('./articles.routes')

router.get('/', (req, res, next) => {
  res.status(200).json({ message: "Welcome to Agape Blog API"})
})
router.use('/users', usersRouter)
router.use('/article', articlesRouter)
router.use(errorHandler)

// Error Handling
function errorHandler(err, req, res, next) {
  console.log('errorHandler hitted')
  res.status(500).json({ message: err.message})
}

module.exports = router;