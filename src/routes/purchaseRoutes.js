const { Router } = require('express')
const authToken = require('../middleware/authToken')
const {
  addNewPurchaseController
} = require('../controllers/purchaseController')

const router = Router()

router.post('/', authToken, addNewPurchaseController)

module.exports = router
