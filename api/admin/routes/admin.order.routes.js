const express = require('express')

const {
    creatOrder,
    getAllOrders,
} = require('../controllers/admin.order.controllers')

const { isAuthenticated, isAdmin } = require('../../../middlewares/auth')
const { getCourseById } = require('../../../middlewares/course')
const { getUserById } = require('../../../middlewares/user')

const router = express.Router()

router.param('userId', getUserById)
router.param('courseId', getCourseById)

router.post('/:userId/:courseId', isAuthenticated, isAdmin, creatOrder)

router.get('/', isAuthenticated, isAdmin, getAllOrders)

module.exports = router
