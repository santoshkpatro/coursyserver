const express = require('express')
const {
    loginController,
    registerController,
    logoutController,
} = require('../controllers/auth.controllers')

const router = express.Router()

router.post('/login', loginController)

router.post('/register', registerController)

router.get('/logout', logoutController)

module.exports = router
