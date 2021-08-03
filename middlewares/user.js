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

exports.getCurrentUser = async function (req, res, next) {
    const user = await User.findById(req.userId)

    if (!user) {
        return res.status(404).send({
            detail: 'Unable to find current user',
        })
    }

    req.user = user

    next()
}
