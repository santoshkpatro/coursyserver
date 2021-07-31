const User = require('../models/user.model')

exports.getUserById = function (req, res, next, userId) {
    User.findById(userId, function (err, user) {
        if (err) {
            next(err)
        } else if (user) {
            req.user = user
            next()
        } else {
            next(new Error('failed to load user'))
        }
    })
}
