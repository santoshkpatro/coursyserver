const User = require('../../../models/user.model')

exports.createUser = async (req, res) => {
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

exports.getAllUsers = async (req, res) => {
    const { page = 0 } = req.query

    try {
        totalUsers = await User.countDocuments()

        const users = await User.find()
            .limit(20)
            .skip(parseInt(page) * 20)
            .exec()

        res.status(200).send({
            users,
            totalPages: totalUsers / 20,
            currentPage: parseInt(page),
            totalItems: totalUsers,
        })
    } catch (error) {
        res.status(500).send({
            detail: 'Something went wrong',
            error,
        })
    }
}

exports.getUser = async (req, res) => {
    const _id = req.params.userId

    try {
        const user = await User.findById(_id).exec()

        if (!user) {
            return res.status(404).send({
                detail: 'User not found',
            })
        }

        res.status(200).send(user)
    } catch (error) {
        res.status(500).send({
            detail: 'Something went wrong',
            error,
        })
    }
}

exports.updateUser = async (req, res) => {
    const _id = req.params.userId

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'isActive', '_roles', 'avatar_url']
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    )

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates' })
    }

    try {
        const user = await User.findById(_id).exec()

        if (!user) {
            return res.status(404).send({
                detail: 'User not found',
            })
        }

        updates.forEach((update) => (user[update] = req.body[update]))
        await user.save()

        res.status(200).send({
            detail: 'User updated successfully',
        })
    } catch (error) {
        res.status(500).send({
            detail: 'Something went wrong',
            error,
        })
    }
}

exports.deleteUser = async (req, res) => {
    const _id = req.params.userId

    try {
        const user = await User.deleteOne({ _id }).exec()

        if (!user) {
            return res.status(404).send({
                detail: 'User not found',
            })
        }

        res.status(200).send({
            detail: 'User deleted successfully',
        })
    } catch (error) {
        res.status(500).send({
            detail: 'Something went wrong',
            error,
        })
    }
}
