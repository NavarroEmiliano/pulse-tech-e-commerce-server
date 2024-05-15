const { createOrder } = require('../services/createOrderService')

const createOrderController = async (req, res) => {
  try {
    const { cart } = req.body
    const order = await createOrder(cart)
    return res.send(order)
  } catch (error) {
    return res
      .status(error.status || 500)
      .send({ status: 'FAILED', data: error.message })
  }
}

module.exports = { createOrderController }
