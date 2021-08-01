const Course = require('../models/course.model')

exports.getCourseById = function (req, res, next, courseId) {
    Course.findById(courseId, function (err, course) {
        if (err) {
            next(err)
        } else if (course) {
            req.course = course
            next()
        } else {
            next(new Error('failed to load course'))
        }
    })
}
