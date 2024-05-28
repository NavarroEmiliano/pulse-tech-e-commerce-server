const { all } = require('axios')
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
  })

  if (!userPurchases) {
    throw {
      status: 409,
      message: 'Empty cart'
    }
  }

  return userPurchases
}

const getAllPurchases = async userId => {
  if (!uploadProductPermission(userId)) {
    throw {
      status: 401,
      message: 'Unauthorized'
    }
  }

  const allPurchases = await Purchase.find({})
    .populate({
      path: 'userId'
    })
    .populate({
      path: 'items.productId'
    })

  if (!allPurchases) {
    throw {
      status: 409,
      message: 'Without purchases'
    }
  }

  return allPurchases
}

module.exports = { createNewPurchase, getUserPurchases, getAllPurchases }
