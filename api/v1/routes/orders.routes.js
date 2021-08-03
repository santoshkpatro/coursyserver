const express = require('express')

const {
    createOrder,
    updateOrder,
} = require('../controllers/orders.controllers')
const { getCurrentUser } = require('../../../middlewares/user')
const { isAuthenticated } = require('../../../middlewares/auth')

const router = express.Router()

router.post('/', isAuthenticated, getCurrentUser, createOrder)

router.patch('/:orderId', isAuthenticated, updateOrder)

module.exports = router
