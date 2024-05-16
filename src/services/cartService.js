const Cart = require('../models/cart')

const getUserCart = async userId => {
  const userCart = await Cart.find({ userId }).populate('productId')

  if (!userCart) {
    throw {
      status: 409,
      message: 'Empty cart'
    }
  }

  return userCart
}

const addToUserCart = async (productId, userId) => {
  const productFound = await Cart.findOne({ productId, userId })

  if (productFound) {
    throw {
      status: 409,
      message: 'Already exists in the cart'
    }
  }

  const payload = {
    productId,
    quantity: 1,
    userId
  }

  const cart = new Cart(payload)

  const savedProduct = (await cart.save()).populate('productId')

  return savedProduct
}

const updateItemUserCart = async (_id, quantity) => {
  if (quantity === 0) {
    await Cart.deleteOne({ _id })
    return null
  }

  const foundItemUpdated = await Cart.findOneAndUpdate(
    { _id },
    { quantity },
    { new: true }
  ).populate('productId')

  return foundItemUpdated
}

const deleteItemCart = async id => {
  const product = await Cart.findByIdAndDelete(id)
  if (product.id) return 'Product successfully removed'
}

const deleteUserCart = async userId => {
  const cartDeleted = await Cart.deleteMany({userId})
  if (cartDeleted.acknowledged) return 'Shopping cart successfully deleted'
}


const countUserCart = async userId => {
  const totalProducts = await Cart.countDocuments({ userId })
  return totalProducts
}

module.exports = {
  addToUserCart,
  getUserCart,
  updateItemUserCart,
  deleteItemCart,
  countUserCart,
  deleteUserCart
}
