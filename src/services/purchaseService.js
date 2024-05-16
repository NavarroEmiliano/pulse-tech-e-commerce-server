const Purchase = require('../models/purchase')

const createNewPurchase = async (newPurchase, userId) => {
  const purchase = new Purchase({
    ...newPurchase,
    userId
  })

  const savedPurchase = await purchase.save()

  return savedPurchase
}

module.exports = { createNewPurchase }
