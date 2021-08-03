const express = require('express')
const { body } = require('express-validator')

const {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    addCourse,
    removeCourse,
} = require('../controllers/admin.user.controllers')

const { isAuthenticated, isAdmin } = require('../../../middlewares/auth')

const { getCourseById } = require('../../../middlewares/course')

const { paginate, validate } = require('../../../middlewares/global')

const router = express.Router()

router.param('courseId', getCourseById)

router.post(
    '/',
    isAuthenticated,
    isAdmin,
    body('password').isLength({ min: 4 }),
    body('name').isLength({ min: 3 }),
    body('_roles').isEmpty(),
    validate,
    createUser
)

router.get('/', isAuthenticated, isAdmin, paginate, getAllUsers)

router.get('/:userId', isAuthenticated, isAdmin, getUser)

router.patch('/:userId', isAuthenticated, isAdmin, updateUser)

router.delete('/:userId', isAuthenticated, isAdmin, deleteUser)

router.get('/:userId/add/:courseId', isAuthenticated, isAdmin, addCourse)

router.get('/:userId/remove/:courseId', isAuthenticated, isAdmin, removeCourse)

module.exports = router
