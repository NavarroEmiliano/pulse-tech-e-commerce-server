const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')

/* Routers */
const usersRouter = require('./routes/usersRoutes')
const loginRouter = require('./routes/loginRoutes')
const userDetailsRouter = require('./routes/userDetailsRoutes')
const productsRouter = require('./routes/productsRoutes')
const cartRouter = require('./routes/cartRoutes')
const paypalRouter = require('./routes/paypalRoutes')
const updateStockRouter = require('./routes/updateStockRoutes')

const authToken = require('./middleware/authToken')
const tokenExtractor = require('./middleware/tokenExtractor')

app.use(
  cors({
    origin: process.env.FRONTEND_URL
  })
)

app.use(express.json())
app.use(tokenExtractor)

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/user-details', authToken, userDetailsRouter)
app.use('/api/products', productsRouter)
app.use('/api/cart', authToken, cartRouter)
app.use('/api/orders', paypalRouter)
app.use('/api/update-stock',updateStockRouter)

module.exports = app
