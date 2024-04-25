const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log(
      'The connection to the database has been established successfully.'
    )
  } catch (error) {
    console.log(error)
  }
}

module.exports = connectDB
