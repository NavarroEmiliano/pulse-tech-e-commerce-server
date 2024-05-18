const forgotPasswordService = require('../services/forgotPasswordService')

const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body
    const userFound = await forgotPasswordService.forgotPassword(email)
    return res.status(201).send({ status: 'OK', data: userFound })
  } catch (error) {
    return res.status(error.status || 500).send({
      status: 'FAILED',
      data: error.message
    })
  }
}

const resetPasswordController = async (req, res) => {
  try {
    const { id, token } = req.params
    const user = await usersService.resetPassword(id, token)
    console.log(user)
    /*     return res.status(201).send({ status: 'OK', data: user }) */
  } catch (error) {
    return res.status(error.status || 500).send({
      status: 'FAILED',
      data: error.message
    })
  }
}

module.exports = {
  forgotPasswordController,
  resetPasswordController
}
