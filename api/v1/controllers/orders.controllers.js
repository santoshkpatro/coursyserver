const Course = require('../../../models/course.model')
const Order = require('../../../models/order.model')

exports.createOrder = async (req, res) => {
    const { courseId } = req.body

    try {
        const course = await Course.findById(courseId).exec()

        if (!course) {
            return res.status(404).send({ detail: 'Course not found' })
        }

        const order = new Order({
            user: req.user._id,
            course: courseId,
        })

        await order.save()

        res.status(201).send({
            detail: 'Order created successfully',
            order,
        })
    } catch (error) {
        res.status(500).send({
            detail: 'Something went wrong',
            error,
        })
    }
}

exports.updateOrder = async (req, res) => {
    const { orderId } = req.params

    const updates = Object.keys(req.body)
    const allowedUpdates = [
        'status',
        'billingDetails',
        'paymentId',
        'transactionId',
    ]
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    )

    if (!isValidOperation) {
        return res.status(400).send({ detail: 'Invalid updates' })
    }

    try {
        const order = await Order.findById(orderId).exec()

        if (order.user.toString() !== req.userId.toString()) {
            return res.status(403).send({
                detail: 'Problem in user authentication',
            })
        }

        updates.forEach((update) => (order[update] = req.body[update]))
        await order.save()

        res.send({
            detail: 'Order update successfull',
            order,
        })
    } catch (error) {
        res.status(500).send({
            detail: 'Something went wrong',
            error,
        })
    }
}
