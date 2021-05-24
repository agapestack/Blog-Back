const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const usersController = require('../controllers/users.controllers')
const auth = require('../middlewares/auth')

router.post('/register', usersController.register)
router.post('/login', usersController.login)

router.get('/:username', auth.isLoggedIn, usersController.getProfile)


module.exports = router;