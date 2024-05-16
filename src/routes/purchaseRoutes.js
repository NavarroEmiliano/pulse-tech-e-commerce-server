const { Router } = require('express')
const authToken = require('../middleware/authToken')
const {
  addNewPurchaseController,
  getUserPurchasesController
} = require('../controllers/purchaseController')

const router = Router()

router
  .post('/', authToken, addNewPurchaseController)
  .get('/user-purchases', authToken, getUserPurchasesController)

module.exports = router
