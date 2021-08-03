const Order = require('../../../models/order.model')

exports.creatOrder = async (req, res) => {
    const courseId = req.course._id
    const userId = req.user._id

    try {
        const order = new Order(req.body)
        order.user = userId
        order.course = courseId

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

exports.getAllOrders = async (req, res) => {
    const page = req.page

    try {
        totalOrders = await Order.find(req.query).countDocuments()

        const orders = await Order.find(req.query)
            .populate('user', 'name username isActive')
            .populate('course', 'courseTitle isActive')
            .limit(20)
            .skip(parseInt(page) * 20)
            .exec()

        res.status(200).send({
            orders,
            totalPages: parseInt(totalOrders / 20),
            currentPage: parseInt(page),
            totalItems: totalOrders,
        })
    } catch (error) {
        res.status(500).send({
            detail: 'Something went wrong',
            error,
        })
    }
}

exports.getOrder = async (req, res) => {
    const _id = req.params.orderId

    try {
        const order = await Order.findById(_id)
            .populate('course', 'courseTitle isActive')
            .populate('user', 'name username isActive')
            .exec()

        if (!order) {
            return res.status(404).send({
                detail: 'Course not found',
            })
        }

        res.status(200).send(order)
    } catch (error) {
        res.status(500).send({
            detail: 'Something went wrong',
            error,
        })
    }
}

exports.updateOrder = async (req, res) => {
    const _id = req.params.orderId

    const updates = Object.keys(req.body)
    const allowedUpdates = [
        'paymentId',
        'transactionId',
        'status',
        'billingDetails',
    ]
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    )

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates' })
    }

    try {
        const order = await Order.findById(_id).exec()

        if (!order) {
            return res.status(404).send({
                detail: 'User not found',
            })
        }

        updates.forEach((update) => (order[update] = req.body[update]))
        await order.save()

        res.status(200).send({
            detail: 'Order updated successfully',
        })
    } catch (error) {
        res.status(500).send({
            detail: 'Something went wrong',
            error,
        })
    }
}

exports.deleteOrder = async (req, res) => {
    const _id = req.params.orderId

    try {
        const order = await Order.deleteOne({ _id }).exec()

        if (!order) {
            return res.status(404).send({
                detail: 'Order not found',
            })
        }

        res.status(200).send({
            detail: 'Order deleted successfully',
        })
    } catch (error) {
        res.status(500).send({
            detail: 'Something went wrong',
            error,
        })
    }
}
