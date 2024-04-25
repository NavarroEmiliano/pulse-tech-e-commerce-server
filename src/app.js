const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')


const usersRouter = require('./routes/usersRoutes')
const loginRouter = require('./routes/loginRoutes')

app.use(cors())
app.use(express.json())
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

module.exports = app
