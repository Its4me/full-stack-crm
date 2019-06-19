const express = require('express')
const app = express()
const bodyParcer = require('body-parser')
const authRoutes = require('./routes/auth')
const analyticsRoutes = require('./routes/analytics')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')

app.use(require('morgan')('dev'))
app.use(bodyParcer.urlencoded(({ extended: true })));
app.use(bodyParcer.json())
app.use(require('cors')())


app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)

module.exports = app