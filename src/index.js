const app = require('./app')
const connectDB = require('./database/db')

const PORT = 8080 || process.env.PORT

const connection = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error(error)
  }
}

connection()
