const { validationResult } = require('express-validator')

exports.paginate = async (req, res, next) => {
    const { page } = req.query

    if (page) {
        req.page = page
    } else {
        req.page = 0
    }

    delete req.query.page

    next()
}

exports.validate = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({ detail: 'Validation Error', errors: errors.array() })
    }

    next()
}
