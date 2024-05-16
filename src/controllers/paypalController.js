const { captureOrder } = require('../services/captureOrderService')
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

const captureOrderController = async (req, res) => {
  try {
    const { orderID } = req.params
    const { jsonResponse, httpStatusCode } = await captureOrder(orderID)
    res.status(httpStatusCode).json(jsonResponse)
  } catch (error) {
    console.error('Failed to create order:', error)
    res.status(500).json({ error: 'Failed to capture order.' })
  }
}

module.exports = { createOrderController,captureOrderController }
