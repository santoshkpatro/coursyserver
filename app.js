const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Root route tested!')
})

const userRoutes = require('./api/v1/routes/user.routes')
const authRoutes = require('./api/auth/routes/auth.routes')

app.use('/v1/users', userRoutes)
app.use('/auth', authRoutes)

module.exports = app
