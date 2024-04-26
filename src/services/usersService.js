const User = require('../models/user')

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

const createNewUser = async newUser => {
  const findUser = await User.find({ email: newUser.email })

  if (findUser.length) {
    throw {
      status: 409,
      message: 'The user already exists in the database'
    }
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
