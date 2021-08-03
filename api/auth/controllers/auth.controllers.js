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

exports.getProfile = async (req, res) => {
    try {
        const userProfile = await User.findById(req.userId)
            .select('-_roles -createdAt -updatedAt -isActive')
            .populate({
                path: 'enrolledCourses',
                populate: {
                    path: 'course',
                    select: 'courseTitle thumbnail_url',
                },
            })
            .exec()

        res.status(200).send(userProfile)
    } catch (error) {
        res.status(500).send({
            detail: 'Something went wrong',
            error,
        })
    }
}

exports.updateProfile = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'avatar_url']
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    )

    if (!isValidOperation) {
        return res.status(400).send({ detail: 'Invalid updates' })
    }
    try {
        const user = await User.findById(req.userId).exec()

        if (!user) {
            return res.status(404).send({
                detail: 'User not found',
            })
        }

        updates.forEach((update) => (user[update] = req.body[update]))
        await user.save()

        res.status(200).send({
            detail: 'Profile updated successfully',
        })
    } catch (error) {
        res.status(500).send({
            detail: 'Something went wrong',
            error,
        })
    }
}
