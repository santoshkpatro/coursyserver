const jwt = require('jsonwebtoken')

exports.isAuthenticated = (req, res, next) => {
    const token = req.cookies.accessToken

    if (!token) {
        return res.status(403).send({
            detail: 'Authentication failed',
        })
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET_TOKEN)

        req.userId = data.id
        req.userRoles = data.roles

        return next()
    } catch (error) {
        return res.status(403).send({
            detail: 'Authentication failed',
        })
    }
}

exports.isAdmin = (req, res, next) => {
    if (req.userRoles.includes('admin')) {
        return next()
    } else {
        return res.status(403).send({
            detail: 'Authorization failed',
        })
    }
}
