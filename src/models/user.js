const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true
    },
    passwordHash: String,
    role : String
  },
  { timestamps: true }
)

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v

    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)
