const cartService  = require('../services/cartService')

const addToCartController = async (req, res) => {
  try {
    const {userId, body } = req

    const savedProduct = await cartService.addToCart(body.productId,userId)
    return res.send({ status: 'OK', data: savedProduct })
  } catch (error) {
    return res
      .status(error.status || 500)
      .send({ status: 'FAILED', data: error.message })
  }
}

const getUserCartController = async(req,res) => {

  try {
    const {userId} = req

    const userCart = await cartService.getUserCart(userId)

    
    return res.send({ status: 'OK', data: userCart})
  } catch (error) {
    return res
      .status(error.status || 500)
      .send({ status: 'FAILED', data: error.message })
  }
}



module.exports = {
  addToCartController,
  getUserCartController
}