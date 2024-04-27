const usersService = require('../services/usersService')

const getUserDetailsController = async (req, res) => {
  try {
    const { userId } = req
    const user = await usersService.getOneUser(userId)
    return res.send({ status: 'OK', data: user })
  } catch (error) {
    return res
      .status(error.status || 500)
      .send({ status: 'FAILED', data: error.message })
  }
}

module.exports = { getUserDetailsController }
