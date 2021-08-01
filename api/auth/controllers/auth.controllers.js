const jwt = require('jsonwebtoken')
const User = require('../../../models/user.model')

exports.loginController = async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await User.findOne({ username }).exec()

        if (!user) {
            return res.status(404).send({
                detail: 'Username or password is incorrect',
            })
        }

        if (!user.validPassword(password)) {
            return res.status(404).send({
                detail: 'Username or password is incorrect',
            })
        }

        const accessToken = jwt.sign(
            { id: user._id, roles: user._roles },
            process.env.JWT_SECRET_TOKEN
        )

        return res
            .cookie('accessToken', accessToken, {
                httpOnly: true,
            })
            .status(200)
            .send({
                detail: 'Logged in successfully',
            })
    } catch (error) {
        res.status(500).send({
            detail: 'Something went wrong',
            error,
        })
    }
}

exports.registerController = async (req, res) => {
    const { username, password } = req.body

    try {
        const existingUser = await User.findOne({ username })

        if (existingUser) {
            return res.status(404).send({
                detail: 'User already exists with this username',
            })
        }

        const newUser = new User(req.body)

        newUser.setPassword(password)
        await newUser.save()

        res.status(201).send({
            detail: 'User created successfully',
            user: newUser,
        })
    } catch (error) {
        res.status(500).send({
            detail: 'Something went wrong',
            error,
        })
    }
}

exports.logoutController = async (req, res) => {
    return res.clearCookie('accessToken').status(200).send({
        detail: 'Successfully Logged Out!!',
    })
}