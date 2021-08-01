const express = require('express')
const {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
} = require('../controllers/user.controllers')

const {
    isAuthenticated,
    isAdmin,
} = require('../../../middlewares/auth.middlewares')

const router = express.Router()

router.post('/', isAuthenticated, isAdmin, createUser)

router.get('/', isAuthenticated, isAdmin, getAllUsers)

router.get('/:userId', isAuthenticated, isAdmin, getUser)

router.patch('/:userId', isAuthenticated, isAdmin, updateUser)

router.delete('/:userId', isAuthenticated, isAdmin, deleteUser)

module.exports = router
