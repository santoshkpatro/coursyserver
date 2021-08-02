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
            .populate('course', 'courseTitle')
            .populate('user', 'name username')
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
