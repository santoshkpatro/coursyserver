const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json())
app.use(cookieParser())

// Auth Routes (Admin + Users)
const authRoutes = require('./api/auth/routes/auth.routes')
app.use('/auth', authRoutes)

// Admin Routes
const adminUserRoutes = require('./api/admin/routes/user.routes')
const adminCourseRoutes = require('./api/admin/routes/course.routes')
app.use('/admin/users', adminUserRoutes)
app.use('/admin/courses', adminCourseRoutes)

// v1 routes (Users routes)
const courseRoutes = require('./api/v1/routes/course.routes')
app.use('/v1/courses', courseRoutes)

module.exports = app
