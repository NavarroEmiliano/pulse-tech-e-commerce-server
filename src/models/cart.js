const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
  {
    productId: {
      ref: 'Product',
      type: String
    },
    quantity: Number,
    userId: String
  },
  { timestamps: true }
)

cartSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v

    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('Cart', cartSchema)
