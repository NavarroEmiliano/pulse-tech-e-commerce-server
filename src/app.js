const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')

/* Routers */
const usersRouter = require('./routes/usersRoutes')
const loginRouter = require('./routes/loginRoutes')
const userDetailsRouter = require('./routes/userDetailsRoutes')
const logoutUserRouter = require('./routes/logoutRoutes')
const productsRouter = require('./routes/productsRoutes')
const cartRouter = require('./routes/cartRoutes')

const authToken = require('./middleware/authToken')

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
)

app.use(express.json())
app.use(cookieParser())

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/user-details', authToken, userDetailsRouter)
app.use('/api/user-logout',logoutUserRouter)
app.use('/api/products', productsRouter)
app.use('/api/cart', authToken, cartRouter)

module.exports = app
