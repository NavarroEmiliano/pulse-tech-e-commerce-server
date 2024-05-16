const { Router } = require('express')
const {
  createOrderController,
  captureOrderController
} = require('../controllers/paypalController')
const { captureOrder } = require('../services/captureOrderService')

const router = Router()

router
  .post('/', createOrderController)
  .post('/:orderID/capture', captureOrderController)
module.exports = router
