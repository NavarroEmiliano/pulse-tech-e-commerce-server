const app = require('./app')
const connectDB = require('./database/db')
const { createAdminDB } = require('./services/createAdminDB')
const { loadProductsFromAPI } = require('./services/loadProductsFromAPI')

const PORT = 3001 || process.env.PORT

const connection = async () => {
  try {
    await connectDB()
    const response = await loadProductsFromAPI()
    console.log(response)
    const userResponse = await createAdminDB()
    console.log(userResponse)
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error(error)
  }
}

connection()
