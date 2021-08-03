const mongoose = require('mongoose')

const billingDetailsSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    country: String,
    state: String,
    city: String,
    address: String,
    pinCode: String,
})

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
        },
        paymentId: String,
        transactionId: String,
        status: {
            type: String,
            default: 'Initiated',
            enum: ['Initiated', 'Processing', 'Discarded', 'Completed'],
        },
        orderAmount: Number,
        billingDetails: billingDetailsSchema,
    },
    { timestamps: true }
)

module.exports = mongoose.model('Order', orderSchema)
