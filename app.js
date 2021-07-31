const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Root route tested!')
})

const userRoutes = require('./routes/user.routes')

app.use('/users', userRoutes)

module.exports = app
