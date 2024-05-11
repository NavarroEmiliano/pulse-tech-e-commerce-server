const usersService = require('./usersService')
const bcrypt = require('bcrypt')

const createAdminDB = async () => {
  try {
    const password = 'admin'
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser = {
      email: 'admin@gmail.com',
      name: 'Admin',
      passwordHash,
      role: 'ADMIN'
    }

    const response = await usersService.createNewUser(newUser)

    return response
  } catch (error) {
    return error.message
  }
}

module.exports = { createAdminDB }
