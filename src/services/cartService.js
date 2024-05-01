const Cart = require('../models/cart')

const getUserCart = async userId => {
  const userCart = await Cart.find({ userId })


  if (!userCart) {
    throw {
      status: 409,
      message: 'Empty cart'
    }
  }

  return userCart
}

const addToCart = async (productId, userId) => {
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

  const savedProduct = await cart.save()

  return savedProduct
}

module.exports = {
  addToCart,
  getUserCart
}
