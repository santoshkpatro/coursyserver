const mongoose = require('mongoose')

const resourceSchema = new mongoose.Schema({
    resourceOrder: Number,
    resourceTitle: {
        type: String,
        required: true,
    },
    resourceType: {
        type: String,
        required: true,
        enum: ['image', 'video', 'zip', 'text'],
        default: 'text',
    },
    resourceDescription: String,
    resourceURL: {
        type: String,
    },
})

const moduleSchema = new mongoose.Schema({
    moduleTitle: {
        type: String,
        required: true,
    },
    resources: [resourceSchema],
})

const instructorSchema = new mongoose.Schema({
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
})

const courseSchema = new mongoose.Schema(
    {
        thumbnail_url: String,
        courseTitle: {
            type: String,
            required: true,
        },
        description: String,
        courseType: String,
        coursePrice: Number,
        isActive: {
            type: Boolean,
            default: true,
        },
        isOpen: {
            type: Boolean,
            default: true,
        },
        modules: [moduleSchema],
        instructors: [instructorSchema],
    },
    { timestamps: true }
)

const Course = mongoose.model('Course', courseSchema)

module.exports = Course
