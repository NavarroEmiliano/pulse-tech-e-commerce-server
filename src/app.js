const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')


const usersRouter = require('./routes/usersRoutes')
const loginRouter = require('./routes/loginRoutes')

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials:true
}))
app.use(express.json())
app.use(cookieParser())

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

module.exports = app
