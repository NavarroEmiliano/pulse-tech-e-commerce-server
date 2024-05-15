const { Router } = require('express')
const {
  createOrderController,
  captureOrderController
} = require('../controllers/paypalController')

const router = Router()

router
  .post('/', createOrderController)
  .post('/:orderID/capture', captureOrderController)
module.exports = router
