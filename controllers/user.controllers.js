const User = require('../models/user.model')

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

exports.getUsers = async (req, res) => {
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
    } catch (error) {}
}
