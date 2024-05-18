const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: 'emilianonavarrotest@gmail.com',
    pass: 'zina qhdv xwli csmd'
  }
})

transporter.verify().then(() => {
  console.log('Ready for send emails')
})

module.exports = { transporter }
