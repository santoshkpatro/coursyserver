const express = require('express')

const { isAuthenticated } = require('../../../middlewares/auth')

const {
    getOpenCourses,
    getEnrolledCourses,
    getEnrolledCourseDetails,
} = require('../controllers/course.controller')

const { getCourseById } = require('../../../middlewares/course')

const router = express.Router()

router.param('courseId', getCourseById)

router.get('/', getOpenCourses)

router.get('/enrolled', isAuthenticated, getEnrolledCourses)

router.get('/enrolled/:courseId', isAuthenticated, getEnrolledCourseDetails)

module.exports = router
