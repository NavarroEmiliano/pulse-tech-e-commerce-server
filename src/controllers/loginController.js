const loginService = require('../services/loginService')

const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).send({
        status: 'FAILED',
        data: 'Missing fields'
      })
    }

    const token = await loginService.loginUser(email, password)

    const tokenOption = {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
    }

    return res
      .cookie('loggedPulseTechUserToken', token, tokenOption)
      .status(200)
      .send({ status: 'OK', data: token })
  } catch (error) {
    return res
      .status(error.status || 500)
      .send({ status: 'FAILED', data: error.message })
  }
}

module.exports = { loginUserController }
