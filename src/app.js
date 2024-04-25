const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')


const usersRouter = require('./routes/usersRoutes')

app.use(cors())
app.use(express.json())
app.use('/api/users', usersRouter)

module.exports = app
