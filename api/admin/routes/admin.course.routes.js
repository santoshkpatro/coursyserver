const express = require('express')

const {
    createCourse,
    getAllCourses,
    getCourse,
    updateCourse,
    deleteCourse,
} = require('../controllers/admin.course.controllers')

const { isAuthenticated, isAdmin } = require('../../../middlewares/auth')

const router = express.Router()

// Admin Routes
router.post('/', isAuthenticated, isAdmin, createCourse)

router.get('/', isAuthenticated, isAdmin, getAllCourses)

router.get('/:courseId', isAuthenticated, isAdmin, getCourse)

router.put('/:courseId', isAuthenticated, isAdmin, updateCourse)

router.delete('/:courseId', isAuthenticated, isAdmin, deleteCourse)

module.exports = router
