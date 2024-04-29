const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    discountPercentage: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      default: 0
    },
    stock: {
      type: Number,
      default: 0
    },
    brand: String,
    category: String,
    images: Array(String),
    state: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)

productSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Product', productSchema)
