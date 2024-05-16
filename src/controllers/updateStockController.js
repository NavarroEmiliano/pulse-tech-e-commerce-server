const { updateStock } = require('../services/updateStockService')

const updateStockController = async (req, res) => {
  try {
    const { products } = req.body
    await updateStock(products)
    return res.status(200).send({ status: 'OK', data: 'Stock updated successfully' })
  } catch (error) {
    return res.status(error.status || 500).send({
      status: 'FAILED',
      data: error.message
    })
  }
}

module.exports = { updateStockController }
