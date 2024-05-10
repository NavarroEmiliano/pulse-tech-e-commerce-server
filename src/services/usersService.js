const User = require('../models/user')
const validator = require('validator')

const getAllUsers = async () => {
  const users = await User.find({})
  return users
}

const getOneUser = async id => {
  const user = await User.findById(id)

  if (!user)
    throw {
      status: 404,
      message: 'User not found'
    }
  return user
}

const createNewUser = async reqBody => {
  const { name, email, password } = reqBody

  if (!name || !email || !password) {
    throw {
      status: 400,
      data: 'Missing fields'
    }
  }

  if (!validator.isEmail(email)) {
    throw {
      status: 400,
      message: 'Email is not valid'
    }
  }

  if (!validator.isStrongPassword(password)) {
    throw {
      status: 400,
      message: 'Password not strong enough'
    }
  }

  const findUser = await User.find({ email: newUser.email })

  if (findUser.length) {
    throw {
      status: 409,
      message: 'Email already in use'
    }
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = {
    email,
    name,
    passwordHash,
    role: 'GENERAL'
  }

  const user = new User({
    ...newUser
  })

  const savedUser = await user.save()

  return savedUser
}

const deleteUser = async id => {
  const user = await User.findByIdAndDelete(id)

  if (!user) {
    throw {
      status: 404,
      message: 'User not found'
    }
  }

  return user
}

const updateUser = async (id, newData) => {
  const user = await User.findByIdAndUpdate(id, newData, { new: true })

  if (!user) {
    throw {
      status: 404,
      message: 'User not found'
    }
  }

  return user
}

module.exports = {
  getAllUsers,
  getOneUser,
  createNewUser,
  deleteUser,
  updateUser
}
