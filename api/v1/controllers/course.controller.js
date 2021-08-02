const Course = require('../../../models/course.model')
const User = require('../../../models/user.model')

exports.getOpenCourses = async (req, res) => {
    try {
        const courses = await Course.find({
            isOpen: true,
            isActive: true,
        })
            .select('-modules -instructors')
            .exec()

        res.status(200).send(courses)
    } catch (error) {
        res.status(500).send({
            detail: 'Something went wrong',
            error,
        })
    }
}

exports.getEnrolledCourses = async (req, res) => {
    try {
        const courses = await User.findById(req.userId)
            .select('enrolledCourses')
            .populate({
                path: 'enrolledCourses',
                populate: { path: 'course', select: 'courseTitle' },
            })
            .exec()

        res.send(courses.enrolledCourses)
    } catch (error) {
        res.status(500).send({
            detail: 'Something went wrong',
            error,
        })
    }
}

exports.getEnrolledCourseDetails = async (req, res) => {
    try {
        console.log(req.course)

        const { enrolledCourses } = await User.findById(req.userId)
            .select('enrolledCourses')
            .exec()

        console.log(
            enrolledCourses.filter(
                (course) => course._id.toString() === req.course._id.toString()
            ).length
        )

        // if (
        //     enrolledCourses.filter(
        //         (course) => course._id.toString() !== req.course._id.toString()
        //     ).length === 0
        // ) {
        //     return res.status(403).send({
        //         detail: 'You are not enrolled in this course!',
        //     })
        // }

        res.send(req.course)
    } catch (error) {
        res.status(500).send({
            detail: 'Something went wrong',
            error,
        })
    }
}
