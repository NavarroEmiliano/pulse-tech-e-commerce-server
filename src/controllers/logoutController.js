const logoutUserController = async (req, res) => {
  try {
    res.clearCookie('loggedPulseTechUserToken')

    return res
      .status(200)
      .send({ status: 'OK', data: 'Logged out successfully' })
  } catch (error) {
    return res
      .status(error.status || 500)
      .send({ status: 'FAILED', data: error.message })
  }
}

module.exports = { logoutUserController }
