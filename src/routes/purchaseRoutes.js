const { Router } = require('express')
const authToken = require('../middleware/authToken')
const {
  addNewPurchaseController,
  getUserPurchasesController,
  getAllPurchasesController
} = require('../controllers/purchaseController')

const router = Router()

router
  .post('/', authToken, addNewPurchaseController)
  .get('/user-purchases', authToken, getUserPurchasesController)
  .get('/all-purchases',authToken,getAllPurchasesController)

module.exports = router
