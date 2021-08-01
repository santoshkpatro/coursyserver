const express = require('express')

const {
    createCourse,
    getAllCourses,
    getCourse,
} = require('../controllers/course.controller')

const {
    isAuthenticated,
    isAdmin,
} = require('../../../middlewares/auth.middlewares')

const router = express.Router()

// Admin Routes
router.post('/', isAuthenticated, isAdmin, createCourse)

router.get('/', isAuthenticated, isAdmin, getAllCourses)

router.get('/:courseId', isAuthenticated, isAdmin, getCourse)

module.exports = router
