const express = require('express')
const {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    addCourse,
    removeCourse,
} = require('../controllers/user.controllers')

const {
    isAuthenticated,
    isAdmin,
} = require('../../../middlewares/auth.middlewares')

const { getCourseById } = require('../../../params/course')

const router = express.Router()

router.param('courseId', getCourseById)

router.post('/', isAuthenticated, isAdmin, createUser)
router.get('/', isAuthenticated, isAdmin, getAllUsers)
router.get('/:userId', isAuthenticated, isAdmin, getUser)
router.patch('/:userId', isAuthenticated, isAdmin, updateUser)
router.delete('/:userId', isAuthenticated, isAdmin, deleteUser)

router.get('/:userId/add/:courseId', isAuthenticated, isAdmin, addCourse)
router.get('/:userId/remove/:courseId', isAuthenticated, isAdmin, removeCourse)

module.exports = router