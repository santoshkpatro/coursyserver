const express = require('express')

const {
    creatOrder,
    getAllOrders,
    getOrder,
    updateOrder,
    deleteOrder,
} = require('../controllers/admin.order.controllers')

const { paginate } = require('../../../middlewares/global')
const { isAuthenticated, isAdmin } = require('../../../middlewares/auth')
const { getCourseById } = require('../../../middlewares/course')
const { getUserById } = require('../../../middlewares/user')

const router = express.Router()

router.param('userId', getUserById)

router.param('courseId', getCourseById)

router.post('/:userId/:courseId', isAuthenticated, isAdmin, creatOrder)

router.get('/', isAuthenticated, isAdmin, paginate, getAllOrders)

router.get('/:orderId', isAuthenticated, isAdmin, getOrder)

router.patch('/:orderId', isAuthenticated, isAdmin, updateOrder)

router.delete('/:orderId', isAuthenticated, isAdmin, deleteOrder)

module.exports = router
