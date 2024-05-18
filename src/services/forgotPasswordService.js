const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const validator = require('validator')

const { transporter } = require('../config/mailer')

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

  const info = await transporter.sendMail({
    from: '"Forgot password 👻" <emilianonavarrotest@gmail.com>', // sender address
    to: email, // list of receivers
    subject: 'Forgot password ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: `${process.env.FRONTEND_URL}/reset-password/${userFound._id}/${token}` // html body
  })

  if (!info.accepted[0])
    throw {
      status: 404,
      message: 'Could not send email'
    }

  return 'An email has been sent to you to reset your password. Please check your inbox (and your spam folder).'
}

const resetPassword = async (id, token, password) => {
  if (!validator.isStrongPassword(password)) {
    throw {
      status: 400,
      message: 'Password not strong enough'
    }
  }

  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, async (err, decoded) => {
      if (err) {
        reject({
          status: 401,
          message: 'Error with token'
        })
      } else {
        try {
          const saltRounds = 10
          const passwordHash = await bcrypt.hash(password, saltRounds)

          const userFound = await User.findByIdAndUpdate(
            { _id: id },
            { passwordHash },
            { new: true }
          )

          if (!userFound) {
            reject({
              status: 404,
              message: 'User not found'
            })
          } else {
            resolve('Your password has been successfully changed.')
          }
        } catch (error) {
          reject({
            status: 500,
            message: 'Internal server error'
          })
        }
      }
    })
  })
}

module.exports = {
  forgotPassword,
  resetPassword
}
