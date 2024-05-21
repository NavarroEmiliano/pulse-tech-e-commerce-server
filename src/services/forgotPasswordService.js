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
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Password Reset</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">

<div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 5px; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
  <h2 style="color: #333333;">Password Reset</h2>
  <p>Hello,</p>
  <p>You recently requested to reset your password. Please click the link below to reset it:</p>
  <p><a href="${process.env.FRONTEND_URL}/reset-password/${userFound._id}/${token}" style="background-color: #007bff; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 3px; display: inline-block;">Reset Password</a></p>
  <p>This link is valid for 5 minutes. If you don't use it within this time, you'll need to request a new password reset.</p>
  <p>If you didn't request a password reset, you can safely ignore this email.</p>
  <p>Thank you,<br>Pulse Tech</p>
</div>

</body>
</html>
`

  const info = await transporter.sendMail({
    from: '"Pulse Tech Support" <emilianonavarrotest@gmail.com>',
    to: email, 
    subject: 'Password Reset Request',
    html: htmlContent
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
