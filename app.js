const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

const authRoutes = require('./api/auth/routes/auth.routes')

const adminUserRoutes = require('./api/admin/routes/admin.user.routes')
const adminCourseRoutes = require('./api/admin/routes/admin.course.routes')
const adminOrderRoutes = require('./api/admin/routes/admin.order.routes')

const v1courseRoutes = require('./api/v1/routes/course.routes')

// Auth Routes (Admin + Users)
app.use('/auth', authRoutes)

// Admin Routes
app.use('/admin/users', adminUserRoutes)
app.use('/admin/courses', adminCourseRoutes)
app.use('/admin/orders', adminOrderRoutes)

// v1 routes (Users routes)
app.use('/v1/courses', v1courseRoutes)

module.exports = app
