const jwt = require('jsonwebtoken')

const authToken = async (req, res, next) => {
  try {
    const { token } = req

    if (!token) {
      throw {
        status: 401,
        message: 'Authorization token required'
      }
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        throw {
          status: 401,
          message: 'Unauthorized'
        }
      }
      req.userId = decoded.id
      next()
    })
  } catch (error) {
    return res
      .status(error.status || 500)
      .send({ status: 'FAILED', data: error.message })
  }
}

module.exports = authToken
