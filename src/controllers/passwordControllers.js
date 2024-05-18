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
    const { password } = req.body
    const message = await forgotPasswordService.resetPassword(id, token, password)
    return res.status(201).send({ status: 'OK', data: message })
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
