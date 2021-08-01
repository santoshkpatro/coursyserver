const mongoose = require('mongoose')
const crypto = require('crypto')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        _password: String,
        _salt: String,
        isActive: {
            type: Boolean,
            default: true,
        },
        avatar_url: {
            type: String,
            required: false,
        },
        _roles: {
            type: Array,
            default: ['user'],
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform: function (doc, ret) {
                delete ret._password
                delete ret._salt
            },
        },
    }
)

userSchema.methods.setPassword = function (password) {
    this._salt = crypto.randomBytes(16).toString('hex')

    this._password = crypto
        .pbkdf2Sync(password, this._salt, 1000, 16, 'sha512')
        .toString('hex')
}

userSchema.methods.validPassword = function (password) {
    var _hash = crypto
        .pbkdf2Sync(password, this._salt, 1000, 16, 'sha512')
        .toString('hex')

    return this._password === _hash
}

module.exports = mongoose.model('User', userSchema)
