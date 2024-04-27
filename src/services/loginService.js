const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const loginUser = async (email, password) => {
  const user = await User.findOne({ email })

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    throw {
      status: 401,
      message: 'Invalid email or password'
    }
  }

  const userForToken = {
    email: user.email,
    name: user.name,
    id: user.id
  }

  const token = jwt.sign(userForToken, process.env.TOKEN_SECRET_KEY, {
    expiresIn: 60 * 60 * 8
  })

  return token
}

module.exports = {
  loginUser
}
