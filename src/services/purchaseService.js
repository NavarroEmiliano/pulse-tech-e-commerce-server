const Purchase = require('../models/purchase')

const createNewPurchase = async (newPurchase, userId) => {
  const purchase = new Purchase({
    ...newPurchase,
    userId
  })

  const savedPurchase = await purchase.save()

  return savedPurchase
}

const getUserPurchases = async userId => {
  const userPurchases = await Purchase.find({ userId }).populate({
    path: 'items',
    populate: {
      path: 'productId',
      model: 'Product'
    }
  });

  console.log(userPurchases)

  if (!userPurchases) {
    throw {
      status: 409,
      message: 'Empty cart'
    }
  }

  return userPurchases
}

module.exports = { createNewPurchase, getUserPurchases }
