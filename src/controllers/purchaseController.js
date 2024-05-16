const purchaseService = require('../services/purchaseService')
const addNewPurchaseController = async (req, res) => {
  try {
    const { userId, body } = req

    const savedPurchase = await purchaseService.createNewPurchase(body, userId)
    return res.send({ status: 'OK', data: savedPurchase })
  } catch (error) {
    return res
      .status(error.status || 500)
      .send({ status: 'FAILED', data: error.message })
  }
}

module.exports = { addNewPurchaseController }
