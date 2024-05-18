const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const User = require('../models/user')


const forgotPassword = async email => {
  const userFound = await User.findOne({ email })

  if (!userFound)
    throw {
      status: 404,
      message: 'User not found'
    }

  const token = jwt.sign(
    { email: userFound.email, id: userFound._id },
    process.env.TOKEN_SECRET_KEY,
    {
      expiresIn: '5m'
    }
  )

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'youremail@gmail.com',
      pass: 'yourpassword'
    }
  })

  let mailOptions = {
    from: 'youremail@gmail.com',
    to: email,
    subject: 'Reset your password',
    text: `http://localhost:5173/reset-password/${userFound._id}/${token}`
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      return 'Email sent: ' + info.response
    }
  })
}

const resetPassword = async (id, token) => {
  const userFound = await User.findOne({ _id: id })

  if (!userFound)
    throw {
      status: 404,
      message: 'User not found'
    }

  const secret = JWT_SECRET + userFound.passwordHash

  const verify = jwt.verify(token, secret)

  const link = `http://localhost:3001/api/users/reset-password/${userFound._id}/${token}`
  return link
}

module.exports = {
  forgotPassword,
  resetPassword
}
