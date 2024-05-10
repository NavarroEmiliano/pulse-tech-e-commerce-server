const cartService = require('../services/cartService')

const addToCartController = async (req, res) => {
  try {
    const { userId, body } = req

    const savedProduct = await cartService.addToUserCart(body.productId, userId)
    return res.send({ status: 'OK', data: savedProduct })
  } catch (error) {
    return res
      .status(error.status || 500)
      .send({ status: 'FAILED', data: error.message })
  }
}

const getUserCartController = async (req, res) => {
  try {
    const { userId } = req

    const userCart = await cartService.getUserCart(userId)

    return res.send({ status: 'OK', data: userCart })
  } catch (error) {
    return res
      .status(error.status || 500)
      .send({ status: 'FAILED', data: error.message })
  }
}

const updateItemUserCartController = async (req, res) => {
  try {
    const { id: _id, quantity } = req.body

    const updatedItem = await cartService.updateItemUserCart(_id, quantity)
    return res.send({ status: 'OK', data: updatedItem })
  } catch (error) {
    return res
      .status(error.status || 500)
      .send({ status: 'FAILED', data: error.message })
  }
}

const deleteItemUserCartController = async (req, res) => {
  try {
    const { productId } = req.params

    const deletedItem = await cartService.deleteItemCart(productId)
    return res.send({ status: 'OK', data: deletedItem })
  } catch (error) {
    return res
      .status(error.status || 500)
      .send({ status: 'FAILED', data: error.message })
  }
}


const countUserCartController = async (req, res) => {
  try {
    const { userId } = req

    const countUserCart = await cartService.countUserCart(userId)
    return res.send({ status: 'OK', data: countUserCart })
  } catch (error) {
    return res
      .status(error.status || 500)
      .send({ status: 'FAILED', data: error.message })
  }
}




module.exports = {
  addToCartController,
  getUserCartController,
  updateItemUserCartController,
  deleteItemUserCartController,
  countUserCartController
}
