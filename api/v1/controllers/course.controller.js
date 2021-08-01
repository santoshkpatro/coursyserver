const Course = require('../../../models/course.model')

exports.createCourse = async (req, res) => {
    try {
        const course = new Course(req.body)

        await course.save()

        res.status(200).send({
            detail: 'Course created successfully!',
            course,
        })
    } catch (error) {
        res.status(500).send({
            detail: 'Something went wrong',
            error,
        })
    }
}

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({})
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

exports.getCourse = async (req, res) => {
    const _id = req.params.courseId

    try {
        const course = await Course.findById(_id).exec()

        if (!course) {
            return res.status(404).send({
                detail: 'Course not found',
            })
        }

        res.status(200).send(course)
    } catch (error) {
        res.status(500).send({
            detail: 'Something went wrong',
            error,
        })
    }
}
