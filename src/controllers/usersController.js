const usersService = require('../services/usersService.js')

const getAllUsersController = async (_req, res) => {
  const allUsers = await usersService.getAllUsers()
  return res.send({ status: 'OK', data: allUsers })
}

const getOneUserController = async (req, res) => {
  try {
    const { id } = req.params
    const user = await usersService.getOneUser(id)
    return res.send({ status: 'OK', data: user })
  } catch (error) {
    return res
      .status(error.status || 500)
      .send({ status: 'FAILED', data: error.message })
  }
}

const createNewUserController = async (req, res) => {
  try {
    const user = await usersService.createNewUser(req.body)

    return res.status(201).send({ status: 'OK', data: user })
  } catch (error) {
    return res.status(error.status || 500).send({
      status: 'FAILED',
      data: error.message
    })
  }
}

const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params
    await usersService.deleteUser(id)

    return res
      .status(200)
      .send({ status: 'OK', data: 'User deleted successfully' })
  } catch (error) {
    return res.status(error.status || 500).send({
      status: 'FAILED',
      data: error.message
    })
  }
}

const updateUserController = async (req, res) => {
  try {
    const {
      body: { name, email, role },
      params: { id }
    } = req

    if (email === 'admin@gmail.com') {
      throw {
        status: 404,
        message:
          'Warning! An administrator cannot be changed to a general user.'
      }
    }

    const newData = {
      ...(name && { name: name }),
      ...(email && { email: email }),
      ...(role && { role: role })
    }

    const updatedUser = await usersService.updateUser(id, newData)

    return res.status(200).send({ status: 'OK', data: updatedUser })
  } catch (error) {
    return res.status(error.status || 500).send({
      status: 'FAILED',
      data: error.message
    })
  }
}

const forgotPasswordController = async (req,res) =>{
  try {

    const {email} = req.body
    const user = await usersService.createNewUser(req.body)

    return res.status(201).send({ status: 'OK', data: user })
  } catch (error) {
    return res.status(error.status || 500).send({
      status: 'FAILED',
      data: error.message
    })
  }
}


const resetPasswordController = async (req,res) =>{
  try {

    const {id,token} = req.params
/*     const user = await usersService.createNewUser(req.body)

    return res.status(201).send({ status: 'OK', data: user }) */
  } catch (error) {
    return res.status(error.status || 500).send({
      status: 'FAILED',
      data: error.message
    })
  }
}

module.exports = {
  getAllUsersController,
  getOneUserController,
  createNewUserController,
  deleteUserController,
  updateUserController,
  resetPasswordController,
  forgotPasswordController
}
