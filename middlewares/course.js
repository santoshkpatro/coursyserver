const Course = require('../models/course.model')

exports.getCourseById = function (req, res, next, courseId) {
    Course.findById(courseId, function (err, course) {
        if (err) {
            return res.status(404).send({
                detail: 'Details not found',
                error: err,
            })
        }

        req.course = course

        next()
    })
}
