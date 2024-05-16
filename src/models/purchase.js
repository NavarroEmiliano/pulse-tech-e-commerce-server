const mongoose = require('mongoose')

const purchaseSchema = new mongoose.Schema(
  {
    id: String,
    status: String,
    userId: String,
    items: [
      {
        productId: {
          ref: 'Product',
          type: String
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ],
    totalPrice: Number
  },
  { timestamps: true }
)

purchaseSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v

    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('Purchase', purchaseSchema)
