const Product = require('../models/product')

const updateStock = async products => {
  for (const productData of products) {
    const { productId, quantitySold } = productData

    const product = await Product.findById(productId)
    if (!product) {
      throw {
        status: 404,
        message: `Product with ID ${productId} not found`
      }
    }

    product.stock -= quantitySold

    await product.save()
  }
}

module.exports = { updateStock }
