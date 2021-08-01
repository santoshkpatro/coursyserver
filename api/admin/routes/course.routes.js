const express = require('express')

const {
    createCourse,
    getAllCourses,
    getCourse,
    updateCourse,
    deleteCourse,
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

router.put('/:courseId', isAuthenticated, isAdmin, updateCourse)

router.delete('/:courseId', isAuthenticated, isAdmin, deleteCourse)

module.exports = router
