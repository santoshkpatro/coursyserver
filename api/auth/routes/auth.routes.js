const express = require('express')
const {
    loginController,
    registerController,
    logoutController,
    getProfile,
} = require('../controllers/auth.controllers')

const { isAuthenticated } = require('../../../middlewares/auth')

const router = express.Router()

router.post('/login', loginController)

router.post('/register', registerController)

router.get('/logout', logoutController)

router.get('/profile', isAuthenticated, getProfile)

module.exports = router
