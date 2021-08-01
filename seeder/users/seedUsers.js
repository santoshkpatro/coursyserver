const User = require('../../models/user.model')
const crypto = require('crypto')
const fs = require('fs')
const mongoose = require('mongoose')
const faker = require('faker')

mongoose
    .connect('mongodb://localhost:27017/coursy-test-db', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log('mongoDB CONNECTED'))
    .catch((e) => console.log('SOMETHING WENT WRONG WHILE CONNECTING TO DB'))

const rawData = fs.readFileSync('../seed_data/MOCK_DATA (3).json')

const users = JSON.parse(rawData)

users.map(async (user) => {
    _salt = crypto.randomBytes(16).toString('hex')
    _password = crypto
        .pbkdf2Sync(user.username, _salt, 1000, 16, 'sha512')
        .toString('hex')

    User.create({
        name: user.name,
        username: user.username,
        _salt,
        _password,
        avatar_url: faker.image.avatar(),
    })
        .then(() => console.log('User created with username: ' + user.username))
        .catch((e) => console.log(e))
})
